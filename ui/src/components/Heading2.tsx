import { Title } from '@mantine/core'
import React, { FC } from 'react'

export const Heading2: FC<{ color?: string; center?: boolean }> = ({ children, color = '#f07832', center = false }) => (
  <Title order={2} c={color} ta={center ? 'center' : 'left'} my='md'>
    {children}
  </Title>
)
