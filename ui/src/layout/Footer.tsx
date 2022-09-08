import { Box, Link, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'

export const Footer = () => {
  return (
    <Box minH={200} bgColor={'gray.100'}>
      <Stack
        divider={<StackDivider borderColor={'gray.400'} />}
        direction={['column', null, null, 'row']}
        maxW={'full'}
        padding={10}
        borderTopWidth={1}
        borderTopColor={'gray.500'}
        pt={10}>
        <Link color={'custom.orange'} href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'}>
          Cambridge @ Makespace Dojo
        </Link>
        <Link color={'gray.500'} href={'https://web.makespace.org'}>
          Makespace
        </Link>
        <Link color={'red'} href={'https://www.raspberrypi.org/'}>
          Raspberry Pi
        </Link>
        <Link color={'purple'} href={'https://www.coolestprojects.org/'}>
          Coolest Projects
        </Link>
        <Link target={'_blank'} color={'pink.400'} href={'https://astro-pi.org/mission-zero/'}>
          ASTRO PI :: MISSION ZERO
        </Link>
        <Link target={'_blank'} color={'blue.400'} href={'https://twitter.com/CoderDojoCamUK/'}>
          Twitter
        </Link>
      </Stack>
    </Box>
  )
}
