import { Box } from '@chakra-ui/react'
import { FC } from 'react'

export const ContentPanel: FC<{ noMargin?: boolean }> = ({ noMargin = false, children }) => {
  return (
    <Box rounded={6} bgColor={'white'} border={'1px solid'} borderColor={'gray.200'} overflow={'auto'} mt={noMargin ? 0 : 5}>
      {children}
    </Box>
  )
}
