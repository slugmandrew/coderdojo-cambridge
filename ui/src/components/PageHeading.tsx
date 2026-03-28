import { Title } from '@mantine/core'
import React, { FC } from 'react'

export const PageHeading: FC = ({ children }) => {
  return (
    <Title order={1} mb="lg">
      {children}
    </Title>
  )
}
