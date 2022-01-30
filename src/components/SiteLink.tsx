import { Heading, HStack, Link, Text } from '@chakra-ui/react'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SiteLink = () => {
  return (
    <HStack w={'full'} spacing={5} wrap={'wrap'} justifyContent={'center'}>
      <Heading size={'lg'} paddingY={3}>
        🖱{' '}
        <Link color={'custom.orange'} size={'lg'} href={'https://coderdojo-cambridge.herokuapp.com/'}>
          coderdojo-cambridge.herokuapp.com
        </Link>
      </Heading>
      <HStack p={[2, null, 3]} bgColor={'white'} border={'1px solid black'} fontSize={[14, null, 18]} alignSelf={'flex-end'}>
        <FontAwesomeIcon icon={faMousePointer} />
        <Text>Go to this link to get here...</Text>
      </HStack>
    </HStack>
  )
}
