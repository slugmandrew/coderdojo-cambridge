import { Title } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const PageHeading: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Title order={1} mb='lg'>
      {children}
    </Title>
  )
}
