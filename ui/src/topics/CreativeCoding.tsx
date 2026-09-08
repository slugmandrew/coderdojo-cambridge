import { List, Text } from '@mantine/core'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopicLayout } from 'components/TopicLayout'
import pixelArt from 'image/pixel-art.png'
import React from 'react'

export const CreativeCoding = () => (
  <TopicLayout
    title={
      <>
        Make art and animations <FontAwesomeIcon icon={faPalette} color='#f08c00' />
      </>
    }
    body={
      <>
        <Text mb='md'>Use code as a creative tool to draw, animate, make music, and bring your own ideas to life.</Text>
        <Text mb='md'>Start with a guided project, then experiment:</Text>
        <List spacing='xs'>
          <List.Item>Change the colours, shapes, sounds, or characters.</List.Item>
          <List.Item>Add movement, interaction, or a surprising pattern.</List.Item>
          <List.Item>Combine techniques to make something that is uniquely yours.</List.Item>
        </List>
      </>
    }
    images={[{ src: pixelArt, alt: 'Colourful pixel art made with code', caption: 'Coding can be a tool for art, music, patterns, and animation.' }]}
  />
)
