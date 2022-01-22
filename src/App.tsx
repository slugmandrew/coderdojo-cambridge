import React from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import data from './Data'
import logo from './coderdojo-cambridge-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <Container maxW={'container.xl'} bgColor={'gray.50'} h={'100vh'}>
      <Flex w={'full'} h={'full'} padding={10}>
        <VStack spacing={10} ali w={'full'} h={'full'}>
          <HStack spacing={5}>
            <Image src={logo} w={100} />
            <VStack>
              <Heading size={'2xl'}>CoderDojo Cambridge</Heading>
              <Heading alignSelf={'flex-start'} size={'md'}>
                Projects, resources & other cool stuff
              </Heading>
            </VStack>
          </HStack>

          <HStack spacing={5}>
            <Heading size={'lg'} paddingY={3}>
              🖱{' '}
              <Link
                size={'lg'}
                color={'#E07BC5'}
                href={'https://coderdojo-cambridge.herokuapp.com/'}
              >
                coderdojo-cambridge.herokuapp.com
              </Link>
            </Heading>{' '}
            <Box w={'200px'}>
              <FontAwesomeIcon icon={faMousePointer} />{' '}
              <Heading size={'xs'}>Go to this link to get here...</Heading>
            </Box>
          </HStack>

          <VStack spacing={2} ali w={'full'} h={'full'}>
            {data.map((proj) => (
              <Box w={'xl'} key={proj.title}>
                <Heading size={'md'} paddingY={3}>
                  {proj.title}
                </Heading>
                <Text>{proj.language}</Text>
                <Link href={proj.url} target={'_blank'}>
                  {proj.url}
                </Link>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Container>
  )
}

export default App
