import { Box, Button, FileInput, Group, Image, Paper, Slider, Stack, Text } from '@mantine/core'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

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

const SelectedImagePreview = ({ file, zoom, positionX, positionY }: { file: File; zoom: number; positionX: number; positionY: number }) => {
  const [source, setSource] = useState<string>()
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setSource(reader.result)
    }
    reader.readAsDataURL(file)
    return () => {
      reader.onload = null
      if (reader.readyState === FileReader.LOADING) reader.abort()
    }
  }, [file])
  return (
    <Image
      src={source || '/project-placeholder.svg'}
      alt='Project picture crop preview'
      className='project-image-crop-preview-image'
      style={{ objectPosition: `${positionX}% ${positionY}%`, transform: `scale(${zoom})`, transformOrigin: `${positionX}% ${positionY}%` }}
    />
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
            Choose a picture from your device, then crop it to fit the project card.
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
        <Box className='project-image-crop-preview'>
          {file ? (
            <SelectedImagePreview key={`${file.name}:${file.size}:${file.lastModified}`} file={file} zoom={zoom} positionX={positionX} positionY={positionY} />
          ) : (
            <Image src={fallbackSrc} fallbackSrc='/project-placeholder.svg' alt='Project picture crop preview' className='project-image-crop-preview-image' />
          )}
        </Box>
        {file && (
          <Stack gap='sm'>
            <div>
              <Text size='sm' fw={700}>
                Zoom
              </Text>
              <Slider thumbLabel='Picture zoom' min={1} max={3} step={0.05} value={zoom} onChange={onZoomChange} />
            </div>
            <div>
              <Text size='sm' fw={700}>
                Horizontal crop
              </Text>
              <Slider thumbLabel='Horizontal crop position' min={0} max={100} value={positionX} onChange={onPositionXChange} />
            </div>
            <div>
              <Text size='sm' fw={700}>
                Vertical crop
              </Text>
              <Slider thumbLabel='Vertical crop position' min={0} max={100} value={positionY} onChange={onPositionYChange} />
            </div>
            <Group justify='flex-end'>
              <Button variant='subtle' color='gray' size='compact-sm' leftSection={<FontAwesomeIcon icon={faRotateLeft} />} onClick={resetCrop}>
                Reset crop
              </Button>
            </Group>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}
