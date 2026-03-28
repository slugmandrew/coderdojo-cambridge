import { Title } from '@mantine/core'
import React, { FC } from 'react'

export const Heading2: FC<{ text?: string; color?: string; center?: boolean }> = ({ children, color = 'dojoOrange.6', center = false }) => {
  return (
    <Title order={2} mt="md" mb="md" color={color} align={center ? 'center' : 'left'}>
      {children}
    </Title>
  )
}
