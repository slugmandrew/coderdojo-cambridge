import { List, Text } from '@mantine/core'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faGauge, faMagnet, faTabletScreenButton, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopicLayout } from 'components/TopicLayout'
import senseHatGif from 'image/raspberry-pi-sense-hat.gif'
import React from 'react'

export const SenseHat = () => (
  <TopicLayout
    title={
      <>
        SenseHAT <FontAwesomeIcon icon={faRaspberryPi} color='#fa5252' />
      </>
    }
    body={
      <>
        <Text mb='md'>The <b>SenseHAT</b> is an add-on board for the Raspberry Pi that provides a range of sensors and inputs that supercharge its capabilities.</Text>
        <Text mb='md'>It's a great way to learn about the world of electronics and programming, and can be used to create some really cool projects.</Text>
        <Text mb='md'>SenseHAT adds extra capabilities to the Raspberry Pi, such as:</Text>
        <List spacing='xs'>
          <List.Item><FontAwesomeIcon icon={faTabletScreenButton} /> 8x8 RGB Matrix Screen</List.Item>
          <List.Item><FontAwesomeIcon icon={faTemperatureHalf} /> Temperature, Humidity & Pressure Sensors</List.Item>
          <List.Item><FontAwesomeIcon icon={faGauge} /> Accelerometer & Gyroscope</List.Item>
          <List.Item><FontAwesomeIcon icon={faGamepad} /> Joystick</List.Item>
          <List.Item><FontAwesomeIcon icon={faMagnet} /> Magnetometer</List.Item>
        </List>
      </>
    }
    images={[
      {
        src: senseHatGif,
        alt: 'SenseHAT in action',
        caption: (
          <>
            <strong>SenseHAT</strong> in action
          </>
        ),
      },
    ]}
  />
)
