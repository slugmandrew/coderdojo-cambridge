import { Title } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const Heading2: FC<{ children?: ReactNode; color?: string; center?: boolean }> = ({ children, color = 'dojoOrange.6', center = false }) => {
  return (
    <Title order={2} mt='md' mb='md' c={color} ta={center ? 'center' : 'left'}>
      {children}
    </Title>
  )
}
