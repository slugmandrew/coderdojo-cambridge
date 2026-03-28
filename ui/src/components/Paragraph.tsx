import { Text } from '@mantine/core'
import React, { FC } from 'react'

export const Paragraph: FC = ({ children }) => {
  return <Text my="md">{children}</Text>
}
