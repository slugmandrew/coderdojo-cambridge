import { Text } from '@mantine/core'
import React, { FC } from 'react'

export const Paragraph: FC = ({ children }) => (
  <Text my='sm' lh={1.6}>
    {children}
  </Text>
)
