import { Tag, useBreakpointValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ColorScheme } from 'types/ColorScheme'
import { Level } from 'types/Level'

export const LevelTag: FC<{ levels: Level[] }> = ({ levels }) => {
  const getColorScheme: (level: Level) => ColorScheme = (level: Level) => {
    switch (level) {
      case Level.beginner:
        return 'cyan'
      case Level.intermediate:
        return 'purple'
      case Level.advanced:
        return 'pink'
    }
  }

  const tagSize = useBreakpointValue({ base: 'lg', md: 'md' })

  return (
    <>
      {levels.map((level) => (
        <Tag size={tagSize} colorScheme={getColorScheme(level)}>
          {level}
        </Tag>
      ))}
    </>
  )
}
