import React from 'react'
import { Box, Container, Flex, GridItem, Heading, HStack, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import logo from './image/coderdojo-cambridge-logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import data from './Data'
import ProjectCard from './ProjectCard'

const App = () => (
  <Container maxW={'full'} minW={'container.sm'} padding={0}>
    <Flex w={'full'} h={'full'} padding={10} borderBottom={'2px solid'} borderBottomColor={'custom.navy'}>
      <VStack spacing={10} w={'full'} h={'full'}>
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

        <HStack spacing={5} wrap={'wrap'}>
          <Heading size={'lg'} paddingY={3}>
            🖱{' '}
            <Link color={'custom.orange'} size={'lg'} href={'https://coderdojo-cambridge.herokuapp.com/'}>
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
            <GridItem key={proj.slug}>
              <ProjectCard {...proj} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
    <Flex maxW={'full'} minH={200} padding={10} bgColor={'gray.100'}>
      <Link color={'custom.orange'} href={'https://zen.coderdojo.com/'}>
        zen.coderdojo.com
      </Link>
    </Flex>
  </Container>
)

export default App
