import { Box, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import logo from './image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  return (
    <HStack spacing={5}>
      <Box height={'100px'} w={'100px'}>
        <Image src={logo} fit={'fill'} />
      </Box>
      <VStack>
        <Heading size={'xl'}>CoderDojo Cambridge</Heading>
        <Heading color={'custom.teal'} alignSelf={'flex-start'} size={'md'}>
          Projects, resources & other cool stuff
        </Heading>
      </VStack>
    </HStack>
  )
}
