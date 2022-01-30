import { Tag } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ColorScheme } from 'types/ColorScheme'
import { Level } from 'types/Level'

export const LevelTag: FC<{ level: Level }> = ({ level }) => {
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
  return (
    <>
      <Tag size={'md'} colorScheme={getColorScheme(level)}>
        {level}
      </Tag>
    </>
  )
}
