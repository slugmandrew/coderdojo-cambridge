const cropWidth = 1200
const cropHeight = 675

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const source = URL.createObjectURL(file)
    const image = new window.Image()
    image.onload = () => {
      URL.revokeObjectURL(source)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(source)
      reject(new Error('That picture could not be opened. Try a JPEG, PNG, or WebP image.'))
    }
    image.src = source
  })

export const createCroppedProjectImage = async (file: File, zoom: number, positionX: number, positionY: number) => {
  const image = await loadImage(file)
  const scale = Math.max(cropWidth / image.naturalWidth, cropHeight / image.naturalHeight) * zoom
  const sourceWidth = cropWidth / scale
  const sourceHeight = cropHeight / scale
  const sourceX = (image.naturalWidth - sourceWidth) * (positionX / 100)
  const sourceY = (image.naturalHeight - sourceHeight) * (positionY / 100)
  const canvas = document.createElement('canvas')
  canvas.width = cropWidth
  canvas.height = cropHeight
  const context = canvas.getContext('2d')
  if (!context) throw new Error('This browser cannot crop pictures.')
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, cropWidth, cropHeight)

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('The cropped picture could not be prepared.'))), 'image/jpeg', 0.88),
  )
}
