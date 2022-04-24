import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

export const ContentCard: FC = ({ children }) => {
  return (
    <Flex rounded={6} bgColor={'white'} border={'1px solid'} borderColor={'gray.200'} overflow={'auto'}>
      {children}
    </Flex>
  )
}
