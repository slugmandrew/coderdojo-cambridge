import { Box, chakra, Flex, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faGauge, faMagnet, faTabletScreenButton, faTemperatureHalf, faThermometer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterableGrid } from 'components/FilterableGrid'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/Projects'
import React from 'react'
import senseHatGif from 'image/raspberry-pi-sense-hat.gif'

export const ProjectList = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} flexWrap={'wrap'} my={5}>
        <Box>
          <Heading size={'xl'}>
            Springtime Pi{' '}
            <chakra.span color={'red.600'}>
              <FontAwesomeIcon icon={faRaspberryPi} />
            </chakra.span>
          </Heading>
          <Heading size={'sm'} color={'teal.400'} my={1}>
            MARCH | APRIL | MAY :: 2022
          </Heading>
          <Text my={5}>
            Our current focus is on coding for <b>Raspberry Pi</b> and <b>SenseHAT</b>.
          </Text>
          <Text>SenseHAT adds extra capabilities to the Raspberry Pi, such as:</Text>
          <UnorderedList>
            <ListItem>
              <FontAwesomeIcon icon={faTabletScreenButton} /> 8x8 RGB Matrix Screen
            </ListItem>
            <ListItem>
              <FontAwesomeIcon icon={faTemperatureHalf} /> Temperature, Humidity & Pressure Sensors
            </ListItem>
            <ListItem>
              <FontAwesomeIcon icon={faGauge} /> Accelerometer & Gyroscope
            </ListItem>
            <ListItem>
              <FontAwesomeIcon icon={faGamepad} /> Joystick
            </ListItem>
            <ListItem>
              <FontAwesomeIcon icon={faMagnet} /> Magnetometer
            </ListItem>
          </UnorderedList>
          <Text fontWeight={'bold'} my={5}>
            Here are some of the projects we'll be working through:
          </Text>
        </Box>

        <Box rounded={5} overflow={'hidden'} bgColor={'white'}>
          <Image height={['100', null, '300']} src={senseHatGif} />
          <Text m={3}>
            <strong>SenseHAT</strong> in action
          </Text>
        </Box>
      </Flex>
      <ProjectGrid projects={data.raspberryPiProjects} />
      <Heading my={5} size={'xl'}>
        Projects
      </Heading>
      <Text my={5}>Recommended projects for Scratch, Python, & HTML</Text>
      <FilterableGrid />
    </>
  )
}
