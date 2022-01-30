import React, { FC } from 'react'
import { Tag } from '@chakra-ui/react'
import { ColorScheme } from 'types/ColorScheme'
import { Level } from 'types/Level'

export const LevelTag: FC<{ level: Level }> = ({ level }) => {
  const getColorScheme: (level: Level) => ColorScheme = (level: Level) => {
    switch (level) {
      case 'Beginner':
        return 'cyan'
      case 'Intermediate':
        return 'purple'
      case 'Advanced':
        return 'pink'
    }
  }
  return (
    <>
      <Tag size={'lg'} colorScheme={getColorScheme(level)}>
        {level}
      </Tag>
    </>
  )
}
