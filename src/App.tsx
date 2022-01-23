import React from 'react'
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import data from './Data'
import logo from './coderdojo-cambridge-logo.png'
import { FaMousePointer } from 'react-icons/all'
import ProjectCard from './ProjectCard'

const App = () => (
  <Container maxW={'container.xl'} bgColor={'gray.50'} h={'100vh'}>
    <Flex w={'full'} h={'full'} padding={10}>
      <VStack spacing={10} ali w={'full'} h={'full'}>
        <HStack spacing={5}>
          <Image src={logo} w={100} />
          <VStack>
            <Heading size={'2xl'}>CoderDojo Cambridge</Heading>
            <Heading color={'brand.teal'} alignSelf={'flex-start'} size={'md'}>
              Projects, resources & other cool stuff
            </Heading>
          </VStack>
        </HStack>

        <HStack spacing={5}>
          <Heading size={'lg'} paddingY={3}>
            🖱{' '}
            <Link
              color={'brand.orange'}
              size={'lg'}
              href={'https://coderdojo-cambridge.herokuapp.com/'}
            >
              coderdojo-cambridge.herokuapp.com
            </Link>
          </Heading>
          <HStack p={3} bgColor={'white'} border={'1px solid black'}>
            <FaMousePointer />
            <Text>Go to this link to get here...</Text>
          </HStack>
        </HStack>

        <SimpleGrid w={'90%'} spacing={5} minChildWidth={500}>
          {data.map((proj) => (
            <GridItem h={'150px'}>
              <ProjectCard {...proj} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  </Container>
)

export default App
