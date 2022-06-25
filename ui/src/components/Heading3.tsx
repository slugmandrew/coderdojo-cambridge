import { Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Heading3: FC<{ text?: string; color?: string; center?: boolean }> = ({ children, color = 'custom.orange', center = false }) => {
  return (
    <Heading size={'md'} my={5} color={color} textAlign={center ? 'center' : 'inherit'}>
      {children}
    </Heading>
  )
}
