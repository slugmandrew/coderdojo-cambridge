import { Title } from '@mantine/core'
import React, { FC } from 'react'

export const Heading3: FC<{ color?: string; center?: boolean }> = ({ children, color = 'orange.7', center = false }) => (
  <Title order={3} my='sm' c={color} ta={center ? 'center' : 'left'}>
    {children}
  </Title>
)
