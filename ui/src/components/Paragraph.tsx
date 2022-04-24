import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Paragraph: FC = ({ children }) => {
  return <Text my={5}>{children}</Text>
}
