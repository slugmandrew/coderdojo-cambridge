import { List, Text } from '@mantine/core'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopicLayout } from 'components/TopicLayout'
import makecodeEditor from 'image/makecode-arcade.png'
import React from 'react'

export const Games = () => (
  <TopicLayout
    title={
      <>
        Make a game <FontAwesomeIcon icon={faGamepad} color='#9c36b5' />
      </>
    }
    body={
      <>
        <Text mb='md'>Games are a brilliant way to practise coding because every project leaves room for your own characters, rules, and surprises.</Text>
        <Text mb='md'>Start with a project that sounds fun, then make it yours:</Text>
        <List spacing='xs'>
          <List.Item>Change the artwork, world, or story.</List.Item>
          <List.Item>Add another challenge or level.</List.Item>
          <List.Item>Invent a new way to win.</List.Item>
        </List>
      </>
    }
    images={[{ src: makecodeEditor, alt: 'A game in the MakeCode editor', caption: 'Build a game, test it, and keep adding your own ideas.' }]}
  />
)
