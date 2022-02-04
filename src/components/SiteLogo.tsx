import { Box, Heading, HStack, Image, useBreakpointValue, VStack } from '@chakra-ui/react'
import logo from 'image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  // const logoSize = ['100px', null, '120px']
  const logoSize = useBreakpointValue({ base: '80px', md: '120px' })
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' })
  const taglineSize = useBreakpointValue({ base: 'xs', md: 'lg' })

  return (
    <HStack spacing={5}>
      <Box height={logoSize} w={logoSize}>
        <Image src={logo} fit={'contain'} />
      </Box>
      <VStack>
        <Heading size={headingSize}>CoderDojo Cambridge</Heading>
        <Heading size={taglineSize} color={'custom.teal'} alignSelf={'flex-start'}>
          Projects, resources & other cool stuff
        </Heading>
      </VStack>
    </HStack>
  )
}
