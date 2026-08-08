import { Title } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const Heading3: FC<{ children?: ReactNode; color?: string; center?: boolean }> = ({ children, color = 'clubOrange.6', center = false }) => {
  return (
    <Title order={3} mt='md' mb='md' c={color} ta={center ? 'center' : 'left'}>
      {children}
    </Title>
  )
}
