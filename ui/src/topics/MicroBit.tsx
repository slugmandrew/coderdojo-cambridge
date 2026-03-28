import { List, Text } from '@mantine/core'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TextLink } from 'components/TextLink'
import { TopicLayout } from 'components/TopicLayout'
import microBitHeadphones from 'image/microbit_headphones.png'
import microBitInHands from 'image/microbit_in_hands.png'
import React from 'react'

export const MicroBit = () => (
  <TopicLayout
    title={
      <>
        A bit of micro:bit <FontAwesomeIcon icon={faMicrochip} color='#868e96' />
      </>
    }
    body={
      <>
        <Text mb='md'>Micro:bits are small circuit boards with <strong>LEDs</strong>, <strong>buttons</strong>, an <strong>accelerometer</strong>, <strong>compass</strong>, and <strong>light</strong> and <strong>temperature</strong> sensors all included.</Text>
        <Text mb='md'>There are two ways to code on a micro:bit: Using the visual MakeCode editor (a bit like Scratch) or using regular python code (more advanced).</Text>
        <Text mb='md'>As always, we have projects across three different levels:</Text>
        <List spacing='xs'>
          <List.Item><strong>Level 1</strong> - Focus on the basics of micro:bit and what it can do. Recommended for ages 7-10.</List.Item>
          <List.Item><strong>Level 2</strong> - More advanced control using loops and conditions, with options to continue visually or move to Python. Recommended for ages 9-13.</List.Item>
          <List.Item><strong>Level 3</strong> - More advanced projects that use multiple micro:bits and take advantage of sensors and radio communication. Recommended for ages 12-17.</List.Item>
        </List>
        <Heading3>Want to go rogue?</Heading3>
        <Text mb='md'>
          You aren't limited to the projects we list here. Feel free to search on <TextLink href='http://microbit.org'>microbit.org</TextLink> for something else cool to work on.
        </Text>
      </>
    }
    images={[
      {
        src: microBitInHands,
        alt: 'Micro:bit in hands',
        caption: (
          <>
            A student using the <strong>MakeCode editor</strong>
          </>
        ),
      },
      {
        src: microBitHeadphones,
        alt: 'Micro:bit headphones project',
        caption: (
          <>
            You can do some really <strong>cool things</strong> with micro:bits!
          </>
        ),
      },
    ]}
  />
)
