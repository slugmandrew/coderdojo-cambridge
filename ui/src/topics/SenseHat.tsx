import { Box, chakra, Flex, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faGauge, faMagnet, faTabletScreenButton, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import senseHatGif from 'image/raspberry-pi-sense-hat.gif'
import React from 'react'

export const SenseHat = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          SenseHAT{' '}
          <chakra.span color={'red.600'}>
            <FontAwesomeIcon icon={faRaspberryPi} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          The <b>SenseHAT</b> is an add-on board for the Raspberry Pi that provides a range of sensors and inputs that superchage its capabilities.
        </Text>
        <Text my={5}>It's a great way to learn about the world of electronics and programming, and can be used to create some really cool projects!</Text>
        <Text my={2}>SenseHAT adds extra capabilities to the Raspberry Pi, such as:</Text>
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
      </Box>

      <Box w={['full', null, null, 2 / 5]} rounded={5} overflow={'hidden'} bgColor={'white'} my={5}>
        <Image src={senseHatGif} />
        <Text m={3}>
          <strong>SenseHAT</strong> in action
        </Text>
      </Box>
    </Flex>
  </>
)
