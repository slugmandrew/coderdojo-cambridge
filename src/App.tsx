import React from 'react'
import { Container, Flex, GridItem, Link, SimpleGrid, VStack } from '@chakra-ui/react'
import data from 'data/Projects'
import { SiteLogo } from 'components/SiteLogo'
import { SiteLink } from 'components/SiteLink'
import { ProjectCard } from 'components/ProjectCard'

export const App = () => (
  <Container maxW={'full'} minW={'container.sm'} padding={0}>
    <Flex w={'full'} h={'full'} padding={10} borderBottom={'2px solid'} borderBottomColor={'custom.navy'}>
      <VStack spacing={10} w={'full'} h={'full'}>
        <SiteLogo />
        <SiteLink />
      </VStack>
    </Flex>
    <Flex maxW={'full'} h={'full'} padding={10} bgColor={'gray.50'} borderBottom={'1px solid'} borderBottomColor={'gray.500'}>
      <SimpleGrid w={'full'} spacing={5} minChildWidth={350}>
        {data.map((proj) => (
          <GridItem key={proj.slug}>
            <ProjectCard {...proj} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Flex>
    <Flex maxW={'full'} minH={200} padding={10} bgColor={'gray.100'}>
      <Link color={'custom.orange'} href={'https://zen.coderdojo.com/'}>
        zen.coderdojo.com
      </Link>
    </Flex>
  </Container>
)
