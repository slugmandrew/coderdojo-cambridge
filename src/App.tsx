import { Container, Flex, HStack, Link, Select, Text, VStack } from '@chakra-ui/react'
import { ProjectGrid } from 'components/ProjectGrid'
import { SiteLink } from 'components/SiteLink'
import { SiteLogo } from 'components/SiteLogo'
import data from 'data/Projects'
import React from 'react'

export const App = () => (
  <Container maxW={'full'} minW={'container.sm'} padding={0}>
    <Flex w={'full'} h={'full'} padding={10} borderBottom={'2px solid'} borderBottomColor={'custom.navy'}>
      <VStack spacing={10} w={'full'} h={'full'}>
        <SiteLogo />
        <SiteLink />
      </VStack>
    </Flex>
    <VStack maxW={'full'} h={'full'} padding={10} bgColor={'gray.50'} borderBottom={'1px solid'} borderBottomColor={'gray.500'}>
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <ProjectGrid projects={data} />
    </VStack>
    <HStack maxW={'full'} minH={200} padding={10} bgColor={'gray.100'}>
      <Link color={'custom.orange'} href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace-cambridge'}>
        Cambridge @ Makespace Dojo
      </Link>
      <Text> | </Text>
      <Link color={'gray.500'} href={'https://zen.coderdojo.com'}>
        zen.coderdojo.com
      </Link>
      <Text> | </Text>
      <Link color={'red'} href={'https://www.raspberrypi.org/'}>
        raspberrypi.org
      </Link>
      <Text> | </Text>
      <Link color={'purple'} href={'https://www.coolestprojects.org/'}>
        coolestprojects.org
      </Link>
    </HStack>
  </Container>
)
