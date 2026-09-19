export const projectImageAspectRatio = 16 / 9
export const maximumProjectImageZoom = 3

export type Rectangle = {
  left: number
  top: number
  width: number
  height: number
}

export type CropGeometry = {
  image: Rectangle
  crop: Rectangle
  baseCropWidth: number
}

export type CropHandle = 'north-west' | 'north-east' | 'south-west' | 'south-east'

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum)

export const calculateCropGeometry = (
  container: { width: number; height: number },
  image: { width: number; height: number },
  zoom: number,
  positionX: number,
  positionY: number,
): CropGeometry | null => {
  if (container.width <= 0 || container.height <= 0 || image.width <= 0 || image.height <= 0) return null

  const imageScale = Math.min(container.width / image.width, container.height / image.height)
  const displayedImageWidth = image.width * imageScale
  const displayedImageHeight = image.height * imageScale
  const imageRectangle = {
    left: (container.width - displayedImageWidth) / 2,
    top: (container.height - displayedImageHeight) / 2,
    width: displayedImageWidth,
    height: displayedImageHeight,
  }
  const baseCropWidth = Math.min(displayedImageWidth, displayedImageHeight * projectImageAspectRatio)
  const cropWidth = baseCropWidth / clamp(zoom, 1, maximumProjectImageZoom)
  const cropHeight = cropWidth / projectImageAspectRatio

  return {
    image: imageRectangle,
    crop: {
      left: imageRectangle.left + (displayedImageWidth - cropWidth) * (clamp(positionX, 0, 100) / 100),
      top: imageRectangle.top + (displayedImageHeight - cropHeight) * (clamp(positionY, 0, 100) / 100),
      width: cropWidth,
      height: cropHeight,
    },
    baseCropWidth,
  }
}

export const moveCrop = (geometry: CropGeometry, positionX: number, positionY: number, deltaX: number, deltaY: number) => {
  const horizontalTravel = geometry.image.width - geometry.crop.width
  const verticalTravel = geometry.image.height - geometry.crop.height

  return {
    positionX: horizontalTravel > 0 ? clamp(positionX + (deltaX / horizontalTravel) * 100, 0, 100) : positionX,
    positionY: verticalTravel > 0 ? clamp(positionY + (deltaY / verticalTravel) * 100, 0, 100) : positionY,
  }
}

const cropPosition = (offset: number, availableTravel: number) => (availableTravel > 0 ? clamp((offset / availableTravel) * 100, 0, 100) : 50)

export const resizeCrop = (geometry: CropGeometry, handle: CropHandle, deltaX: number, deltaY: number) => {
  const fromWest = handle.endsWith('west')
  const fromNorth = handle.startsWith('north')
  const horizontalChange = (fromWest ? -1 : 1) * deltaX
  const verticalChange = (fromNorth ? -1 : 1) * deltaY * projectImageAspectRatio
  const sizeChange = Math.abs(horizontalChange) >= Math.abs(verticalChange) ? horizontalChange : verticalChange
  const anchorX = fromWest ? geometry.crop.left + geometry.crop.width : geometry.crop.left
  const anchorY = fromNorth ? geometry.crop.top + geometry.crop.height : geometry.crop.top
  const horizontalRoom = fromWest ? anchorX - geometry.image.left : geometry.image.left + geometry.image.width - anchorX
  const verticalRoom = fromNorth ? anchorY - geometry.image.top : geometry.image.top + geometry.image.height - anchorY
  const maximumWidth = Math.min(geometry.baseCropWidth, horizontalRoom, verticalRoom * projectImageAspectRatio)
  const minimumWidth = geometry.baseCropWidth / maximumProjectImageZoom
  const width = clamp(geometry.crop.width + sizeChange, minimumWidth, maximumWidth)
  const height = width / projectImageAspectRatio
  const left = fromWest ? anchorX - width : anchorX
  const top = fromNorth ? anchorY - height : anchorY

  return {
    zoom: clamp(geometry.baseCropWidth / width, 1, maximumProjectImageZoom),
    positionX: cropPosition(left - geometry.image.left, geometry.image.width - width),
    positionY: cropPosition(top - geometry.image.top, geometry.image.height - height),
  }
}
