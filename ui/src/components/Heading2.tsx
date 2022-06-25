import { Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Heading2: FC<{ text?: string; color?: string; center?: boolean }> = ({ children, color = 'custom.orange', center = false }) => {
  return (
    <Heading size={'lg'} my={5} color={color} textAlign={center ? 'center' : 'inherit'}>
      {children}
    </Heading>
  )
}
