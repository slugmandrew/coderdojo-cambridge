import { Title } from '@mantine/core'
import React, { FC } from 'react'

export const PageHeading: FC = ({ children }) => (
  <Title order={1} my='md'>
    {children}
  </Title>
)
