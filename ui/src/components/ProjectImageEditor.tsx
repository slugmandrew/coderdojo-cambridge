import { Box, Button, FileInput, Group, Image, Paper, Slider, Stack, Text } from '@mantine/core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { calculateCropGeometry, CropGeometry, CropHandle, maximumProjectImageZoom, moveCrop, resizeCrop } from 'components/ProjectImageCropGeometry'
import React, { KeyboardEvent, PointerEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'

type ProjectImageEditorProps = {
  file: File | null
  fallbackSrc: string
  zoom: number
  positionX: number
  positionY: number
  onFileChange: (file: File | null) => void
  onZoomChange: (value: number) => void
  onPositionXChange: (value: number) => void
  onPositionYChange: (value: number) => void
}

const useSelectedImageSource = (file: File | null, fallbackSrc: string) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; source: string }>()
  useEffect(() => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setSelectedImage({ file, source: reader.result })
    }
    reader.readAsDataURL(file)
    return () => {
      reader.onload = null
      if (reader.readyState === FileReader.LOADING) reader.abort()
    }
  }, [file])
  return file ? (selectedImage?.file === file ? selectedImage.source : '/project-placeholder.svg') : fallbackSrc
}

type Gesture =
  | { type: 'move'; pointerId: number; startX: number; startY: number; positionX: number; positionY: number; geometry: CropGeometry }
  | { type: 'resize'; pointerId: number; startX: number; startY: number; handle: CropHandle; geometry: CropGeometry }

const CropPreview = ({
  file,
  fallbackSrc,
  zoom,
  positionX,
  positionY,
  onZoomChange,
  onPositionXChange,
  onPositionYChange,
}: Omit<ProjectImageEditorProps, 'onFileChange'>) => {
  const source = useSelectedImageSource(file, fallbackSrc)
  const stageRef = useRef<HTMLDivElement>(null)
  const gesture = useRef<Gesture | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () => {
      const bounds = stage.getBoundingClientRect()
      setContainerSize((current) =>
        current.width === bounds.width && current.height === bounds.height ? current : { width: bounds.width, height: bounds.height },
      )
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const geometry = calculateCropGeometry(containerSize, imageSize, zoom, positionX, positionY)

  const beginMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!geometry || event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current = { type: 'move', pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, positionX, positionY, geometry }
  }

  const beginResize = (event: PointerEvent<HTMLSpanElement>, handle: CropHandle) => {
    if (!geometry || event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current = { type: 'resize', pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, handle, geometry }
  }

  const changeCrop = (event: PointerEvent<HTMLDivElement>) => {
    const activeGesture = gesture.current
    if (!activeGesture || activeGesture.pointerId !== event.pointerId) return
    const deltaX = event.clientX - activeGesture.startX
    const deltaY = event.clientY - activeGesture.startY
    if (activeGesture.type === 'move') {
      const position = moveCrop(activeGesture.geometry, activeGesture.positionX, activeGesture.positionY, deltaX, deltaY)
      onPositionXChange(position.positionX)
      onPositionYChange(position.positionY)
      return
    }
    const crop = resizeCrop(activeGesture.geometry, activeGesture.handle, deltaX, deltaY)
    onZoomChange(crop.zoom)
    onPositionXChange(crop.positionX)
    onPositionYChange(crop.positionY)
  }

  const endGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current?.pointerId === event.pointerId) gesture.current = null
  }

  const moveCropWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 5 : 1
    if (event.key === 'ArrowLeft') onPositionXChange(Math.max(0, positionX - step))
    else if (event.key === 'ArrowRight') onPositionXChange(Math.min(100, positionX + step))
    else if (event.key === 'ArrowUp') onPositionYChange(Math.max(0, positionY - step))
    else if (event.key === 'ArrowDown') onPositionYChange(Math.min(100, positionY + step))
    else if (event.key === '+' || event.key === '=') onZoomChange(Math.min(maximumProjectImageZoom, zoom + 0.05))
    else if (event.key === '-') onZoomChange(Math.max(1, zoom - 0.05))
    else return
    event.preventDefault()
  }

  const imageStyle = geometry ? { left: geometry.image.left, top: geometry.image.top, width: geometry.image.width, height: geometry.image.height } : undefined
  const cropStyle = geometry ? { left: geometry.crop.left, top: geometry.crop.top, width: geometry.crop.width, height: geometry.crop.height } : undefined

  return (
    <Box ref={stageRef} className='project-image-crop-stage' onPointerMove={changeCrop} onPointerUp={endGesture} onPointerCancel={endGesture}>
      <Image
        src={source}
        fallbackSrc='/project-placeholder.svg'
        alt='Picture available for cropping'
        className='project-image-crop-source'
        style={imageStyle}
        draggable={false}
        onLoad={(event) => setImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
      />
      {geometry && (
        <div
          className='project-image-crop-selection'
          style={cropStyle}
          role='group'
          aria-label='Crop selection'
          tabIndex={0}
          onPointerDown={beginMove}
          onKeyDown={moveCropWithKeyboard}>
          <span className='project-image-crop-grid project-image-crop-grid-vertical' />
          <span className='project-image-crop-grid project-image-crop-grid-horizontal' />
          {(['north-west', 'north-east', 'south-west', 'south-east'] as const).map((handle) => (
            <span
              key={handle}
              className={`project-image-crop-handle project-image-crop-handle-${handle}`}
              aria-hidden='true'
              onPointerDown={(event) => beginResize(event, handle)}
            />
          ))}
        </div>
      )}
    </Box>
  )
}

export const ProjectImageEditor = ({
  file,
  fallbackSrc,
  zoom,
  positionX,
  positionY,
  onFileChange,
  onZoomChange,
  onPositionXChange,
  onPositionYChange,
}: ProjectImageEditorProps) => {
  const resetCrop = () => {
    onZoomChange(1)
    onPositionXChange(50)
    onPositionYChange(50)
  }

  return (
    <Paper withBorder radius='md' p='md'>
      <Stack gap='md'>
        <div>
          <Text fw={700}>Project picture</Text>
          <Text size='sm' c='dimmed'>
            Choose the part of the picture that will appear on the project card, or select a replacement from your device.
          </Text>
        </div>
        <FileInput
          aria-label='Project picture'
          accept='image/jpeg,image/png,image/webp'
          clearable
          placeholder='Choose a JPEG, PNG, or WebP picture'
          value={file}
          onChange={onFileChange}
        />
        <CropPreview
          file={file}
          fallbackSrc={fallbackSrc}
          zoom={zoom}
          positionX={positionX}
          positionY={positionY}
          onZoomChange={onZoomChange}
          onPositionXChange={onPositionXChange}
          onPositionYChange={onPositionYChange}
        />
        <Stack gap='sm'>
          <Text size='sm' c='dimmed'>
            Drag the frame to move it. Drag any corner to resize it; the project card shape stays fixed.
          </Text>
          <div>
            <Text size='sm' fw={700}>
              Zoom
            </Text>
            <Slider thumbLabel='Picture zoom' min={1} max={maximumProjectImageZoom} step={0.05} value={zoom} onChange={onZoomChange} />
          </div>
          <Group justify='flex-end'>
            <Button variant='subtle' color='gray' size='compact-sm' leftSection={<FontAwesomeIcon icon={faRotateLeft} />} onClick={resetCrop}>
              Reset crop
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  )
}
