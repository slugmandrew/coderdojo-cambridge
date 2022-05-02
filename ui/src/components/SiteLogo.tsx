import { Box, Heading, HStack, Image, useBreakpointValue, VStack } from '@chakra-ui/react'
import logo from 'image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  const logoSize = useBreakpointValue({ base: '60px', md: '110px' })
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' })
  const taglineSize = useBreakpointValue({ base: 'sm', md: 'lg' })

  return (
    <HStack spacing={5}>
      <Box height={logoSize} w={logoSize}>
        <Image src={logo} fit={'contain'} />
      </Box>
      <VStack>
        <Heading size={headingSize} fontFamily={'Big Shoulders Display'} color={'gray.700'}>
          CoderDojo Cambridge @ Makespace
        </Heading>
        <Heading size={taglineSize} color={'custom.teal'} fontFamily={'Ubuntu'} alignSelf={'center'} fontWeight={'light'}>
          Code club for 7-17 year olds
        </Heading>
      </VStack>
    </HStack>
  )
}
