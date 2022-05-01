import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

export const ContentCard: FC<{ noMargin?: boolean }> = ({ noMargin = false, children }) => {
  return (
    <Flex rounded={6} bgColor={'white'} border={'1px solid'} borderColor={'gray.200'} overflow={'auto'} mt={noMargin ? 0 : 5}>
      {children}
    </Flex>
  )
}
