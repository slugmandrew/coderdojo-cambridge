import { List, Text } from '@mantine/core'
import { faGifts } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TopicLayout } from 'components/TopicLayout'
import christmasJumper from 'image/christmas_jumper.png'
import sonicPiCode from 'image/sonic_pi_code.png'
import React from 'react'

export const Christmas = () => (
  <TopicLayout
    title={
      <>
        Christmas <FontAwesomeIcon icon={faGifts} color='#fa5252' />
      </>
    }
    body={
      <>
        <Text mb='md'><strong>It's cold and dark, but Santa is on the way,</strong> so let's get festive and do some Christmas coding.</Text>
        <Text mb='md'>We have <strong>FIVE</strong> awesome <strong>winter themed projects</strong>, using a variety of <strong>different languages</strong>:</Text>
        <Heading3>Scratch</Heading3>
        <List spacing='xs' mb='md'>
          <List.Item><strong>Scratch Cat goes skiing</strong> - Create a downhill skiing game where the goal is to dodge trees and other obstacles to score as many points as possible.</List.Item>
          <List.Item><strong>Jazzy jumpers</strong> - Create a memory game based on funky Christmas jumper designs.</List.Item>
          <List.Item><strong>Snowball fight</strong> - Create a game where the aim is to hit a target by throwing snowballs of varying strengths.</List.Item>
        </List>
        <Heading3>Python</Heading3>
        <List spacing='xs' mb='md'>
          <List.Item><strong>Turtle snowflakes</strong> - Create some awesome snowflake patterns. Great for beginner to intermediate Python coders.</List.Item>
        </List>
        <Heading3>Sonic Pi</Heading3>
        <List spacing='xs'>
          <List.Item><strong>Code a Christmas carol</strong> - Learn how to use Sonic Pi to create music through code. Here we make the 12 Days of Christmas song.</List.Item>
        </List>
      </>
    }
    images={[
      {
        src: christmasJumper,
        alt: 'Christmas jumper project',
        caption: (
          <>
            Can you remember what the <strong>Christmas jumper</strong> looked like?
          </>
        ),
      },
      {
        src: sonicPiCode,
        alt: 'Sonic Pi code',
        caption: (
          <>
            <strong>Sonic Pi Code</strong> - Highly recommended for anyone that loves music.
          </>
        ),
      },
    ]}
  />
)
