import { List, Text } from '@mantine/core'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TopicLayout } from 'components/TopicLayout'
import schematic from 'image/printing-schematic.png'
import React from 'react'

export const Printing = () => (
  <TopicLayout
    title={
      <>
        3D Printing <FontAwesomeIcon icon={faPrint} color='#6c757d' />
      </>
    }
    body={
      <>
        <Text mb='md'>
          Did you know you can make almost anything in a <b>3D Printer</b>?
        </Text>
        <Text mb='md'>
          We have three <strong>cool projects</strong> to get you started here:
        </Text>
        <Heading3>Want to get creative?</Heading3>
        <Text mb='md'>You aren't limited to the projects we list here.</Text>
        <Text mb='md'>
          Feel free to come up with your own ideas for things to print! It can be anything your imagination can think of. Here's some ideas to get you started:
        </Text>
        <List spacing='xs'>
          <List.Item>
            <strong>Minecraft characters</strong>
          </List.Item>
          <List.Item>
            <strong>A sign for your bedroom door</strong>
          </List.Item>
          <List.Item>
            <strong>A model of one of your pets</strong>
          </List.Item>
          <List.Item>
            <strong>A model of one of your parents (be nice!)</strong>
          </List.Item>
        </List>
      </>
    }
    images={[
      {
        src: schematic,
        alt: '3D printing schematic',
        caption: (
          <>
            3D Printers work by adding <strong>layers of filament one after the other</strong>. What do you want to make today?
          </>
        ),
      },
    ]}
  />
)
