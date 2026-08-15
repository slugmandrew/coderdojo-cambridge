import { Badge, Group } from '@mantine/core'
import React, { FC } from 'react'
import { Level } from 'types/Level'

export const LevelTag: FC<{ levels: Level[] }> = ({ levels }) => {
  const getColorScheme = (level: Level) => {
    switch (level) {
      case Level.one:
        return 'teal'
      case Level.two:
        return 'violet'
      case Level.three:
        return 'pink'
    }
  }

  return (
    <Group gap='xs'>
      {levels.map((level) => (
        <Badge key={level} size='lg' color={getColorScheme(level)} variant='light'>
          {level}
        </Badge>
      ))}
    </Group>
  )
}
