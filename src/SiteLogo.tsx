import { Box, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import logo from './image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  const logoSize = ['100px', null, '120px']
  return (
    <HStack spacing={5}>
      <Box height={logoSize} w={logoSize}>
        <Image src={logo} fit={'fill'} />
      </Box>
      <VStack>
        <Heading size={'2xl'}>CoderDojo Cambridge</Heading>
        <Heading size={'lg'} color={'custom.teal'} alignSelf={'flex-start'}>
          Projects, resources & other cool stuff
        </Heading>
      </VStack>
    </HStack>
  )
}
