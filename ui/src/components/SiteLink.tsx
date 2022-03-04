import { Heading, HStack, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SiteLink = () => {
  const linkSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' })

  return (
    <HStack w={'full'} spacing={5} wrap={'wrap'} justifyContent={'center'}>
      <Heading size={linkSize} paddingY={3}>
        🖱{' '}
        <Link color={'custom.orange'} href={'https://coderdojo-cambridge.herokuapp.com/'} fontFamily={'courier'}>
          coderdojo-cambridge.herokuapp.com
        </Link>
      </Heading>
      <HStack p={[2, null, 3]} bgColor={'white'} border={'1px solid black'} fontSize={[12, null, 18]} alignSelf={'flex-end'}>
        <FontAwesomeIcon icon={faMousePointer} />
        <Text>Go to this link to get here...</Text>
      </HStack>
    </HStack>
  )
}
