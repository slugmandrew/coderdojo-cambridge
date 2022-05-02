import { Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

export const SubHeading: FC<{ text?: string; color?: string }> = ({ children, color = 'custom.orange' }) => {
  return (
    <Heading size={'lg'} my={5} color={color}>
      {children}
    </Heading>
  )
}
