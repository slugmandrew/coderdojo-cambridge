import { calculateCropGeometry, moveCrop, projectImageAspectRatio, resizeCrop } from 'components/ProjectImageCropGeometry'
import { describe, expect, test } from 'vitest'

describe('project image crop geometry', () => {
  test('fits the complete image in the crop stage and creates a 16:9 selection', () => {
    const geometry = calculateCropGeometry({ width: 800, height: 600 }, { width: 1600, height: 1200 }, 1, 50, 50)

    expect(geometry).not.toBeNull()
    expect(geometry!.image).toEqual({ left: 0, top: 0, width: 800, height: 600 })
    expect(geometry!.crop.width / geometry!.crop.height).toBeCloseTo(projectImageAspectRatio)
    expect(geometry!.crop).toMatchObject({ left: 0, top: 75, width: 800, height: 450 })
  })

  test('moves the crop within the available image area', () => {
    const geometry = calculateCropGeometry({ width: 800, height: 600 }, { width: 1600, height: 1200 }, 2, 50, 50)!

    expect(moveCrop(geometry, 50, 50, 100, -75)).toEqual({ positionX: 75, positionY: 30 })
    expect(moveCrop(geometry, 50, 50, 1000, -1000)).toEqual({ positionX: 100, positionY: 0 })
  })

  test('resizes from a corner without changing the project-card aspect ratio', () => {
    const geometry = calculateCropGeometry({ width: 800, height: 600 }, { width: 1600, height: 1200 }, 1, 50, 50)!
    const resized = resizeCrop(geometry, 'south-east', -400, -225)
    const resizedGeometry = calculateCropGeometry(
      { width: 800, height: 600 },
      { width: 1600, height: 1200 },
      resized.zoom,
      resized.positionX,
      resized.positionY,
    )!

    expect(resized.zoom).toBe(2)
    expect(resizedGeometry.crop.width / resizedGeometry.crop.height).toBeCloseTo(projectImageAspectRatio)
    expect(resizedGeometry.crop).toMatchObject({ left: 0, top: 75, width: 400, height: 225 })
  })

  test('limits corner resizing to the supported zoom range', () => {
    const geometry = calculateCropGeometry({ width: 800, height: 600 }, { width: 1600, height: 1200 }, 1, 50, 50)!

    expect(resizeCrop(geometry, 'south-east', -1000, -1000).zoom).toBe(3)
    expect(resizeCrop(geometry, 'south-east', 1000, 1000).zoom).toBe(1)
  })
})
