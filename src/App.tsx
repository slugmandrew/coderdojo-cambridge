import React from 'react'
import { Box, Container, Flex, GridItem, Heading, HStack, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import data from './Data'
import logo from './image/coderdojo-cambridge-logo.jpg'
import ProjectCard from './ProjectCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'

const App = () => (
  <Container maxW={'full'} minW={'container.sm'} padding={0}>
    <Flex w={'full'} h={'full'} padding={10} borderBottom={'2px solid'} borderBottomColor={'brand.navy'}>
      <VStack spacing={10} ali w={'full'} h={'full'}>
        <HStack spacing={5}>
          <Box height={'100px'} w={'100px'}>
            <Image src={logo} fit={'fill'} />
          </Box>
          <VStack>
            <Heading size={'xl'}>CoderDojo Cambridge</Heading>
            <Heading color={'brand.teal'} alignSelf={'flex-start'} size={'md'}>
              Projects, resources & other cool stuff
            </Heading>
          </VStack>
        </HStack>

        <HStack spacing={5} wrap={'wrap'}>
          <Heading size={'lg'} paddingY={3}>
            🖱{' '}
            <Link color={'brand.orange'} size={'lg'} href={'https://coderdojo-cambridge.herokuapp.com/'}>
              coderdojo-cambridge.herokuapp.com
            </Link>
          </Heading>
          <HStack p={3} bgColor={'white'} border={'1px solid black'}>
            <FontAwesomeIcon icon={faMousePointer} />
            <Text>Go to this link to get here...</Text>
          </HStack>
        </HStack>
      </VStack>
    </Flex>
    <Flex maxW={'full'} h={'full'} padding={10} bgColor={'gray.50'} borderBottom={'1px solid'} borderBottomColor={'gray.500'}>
      <VStack w={'full'} h={'full'}>
        <SimpleGrid w={'full'} spacing={5} minChildWidth={350}>
          {data.map((proj) => (
            <GridItem>
              <ProjectCard {...proj} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
    <Flex maxW={'full'} minH={200} padding={10} bgColor={'gray.100'}>
      <Link color={'brand.orange'} href={'https://zen.coderdojo.com/'}>
        zen.coderdojo.com
      </Link>
    </Flex>
  </Container>
)

export default App
