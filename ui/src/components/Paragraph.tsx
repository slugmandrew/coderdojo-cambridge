import { Text } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const Paragraph: FC<{ children?: ReactNode }> = ({ children }) => {
  return <Text my='md'>{children}</Text>
}
