import { Flex, Heading, Text } from '@chakra-ui/react'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterableGrid } from 'components/FilterableGrid'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/Projects'
import React from 'react'

export const ProjectList = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} my={5}>
        <Heading size={'xl'} color={'red.600'}>
          Springtime Pi <FontAwesomeIcon icon={faRaspberryPi} />
        </Heading>
        <Heading size={'md'} color={'teal.400'}>
          MARCH | APRIL | MAY :: 2022
        </Heading>
      </Flex>
      <Text my={5}>Our current focus is on coding for Raspberry Pi.</Text>
      <Text fontWeight={'bold'} my={5}>
        Here are some of the projects we'll be working through:
      </Text>
      <ProjectGrid projects={data.raspberryPiProjects} />
      <Heading my={5} size={'xl'}>
        Projects
      </Heading>
      <Text my={5}>Recommended projects for Scratch, Python, & HTML</Text>
      <FilterableGrid />
    </>
  )
}
