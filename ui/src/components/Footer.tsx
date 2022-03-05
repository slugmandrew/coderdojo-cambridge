import { HStack, Link, Text } from '@chakra-ui/react'
import React from 'react'

export const Footer = () => {
  return (
    <HStack maxW={'full'} minH={200} padding={10} bgColor={'gray.100'}>
      <Link color={'custom.orange'} href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'}>
        Cambridge @ Makespace Dojo
      </Link>
      <Text> | </Text>
      <Link color={'gray.500'} href={'https://web.makespace.org'}>
        Makespace
      </Link>
      <Text> | </Text>
      <Link color={'red'} href={'https://www.raspberrypi.org/'}>
        Raspberry Pi
      </Link>
      <Text> | </Text>
      <Link color={'purple'} href={'https://www.coolestprojects.org/'}>
        Coolest Projects
      </Link>
      <Text> | </Text>
      <Link target={'_blank'} color={'pink.400'} href={'https://astro-pi.org/mission-zero/'}>
        ASTRO PI :: MISSION ZERO
      </Link>
    </HStack>
  )
}
