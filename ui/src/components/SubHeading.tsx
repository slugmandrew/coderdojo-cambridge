import { Heading } from '@chakra-ui/react'
import React, { FC } from 'react'

export const SubHeading: FC<{ text?: string }> = ({ children }) => {
  return (
    <Heading size={'lg'} mb={5} color={'custom.orange'}>
      {children}
    </Heading>
  )
}
