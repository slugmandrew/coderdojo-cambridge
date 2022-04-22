import { Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

export const PageHeading: FC<{ text?: string }> = ({ children }) => {
  return (
    <Heading size={'2xl'} my={5}>
      {children}
    </Heading>
  )
}
