import { Badge, Group } from '@mantine/core'
import React, { FC } from 'react'
import { Level } from 'types/Level'

export const LevelTag: FC<{ levels: Level[] }> = ({ levels }) => {
  const colorFor = (level: Level) =>
    level === Level.intro ? 'green' : level === Level.one ? 'cyan' : level === Level.two ? 'violet' : 'pink'

  return (
    <Group spacing='xs'>
      {levels.map((level) => (
        <Badge key={level} color={colorFor(level)}>{level}</Badge>
      ))}
    </Group>
  )
}
