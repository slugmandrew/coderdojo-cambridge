import { List, Text } from '@mantine/core'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TextLink } from 'components/TextLink'
import { TopicLayout } from 'components/TopicLayout'
import bookReader from 'image/book-reader.png'
import makecodeEditor from 'image/makecode-arcade.png'
import React from 'react'

export const Stories = () => (
  <TopicLayout
    title={
      <>
        Code your own stories <FontAwesomeIcon icon={faBook} color='#4dabf7' />
      </>
    }
    body={
      <>
        <Text mb='md'>A great way to learn any programming language is by <b>coding stories</b>.</Text>
        <Text mb='md'>We have some <strong>suggested projects</strong> in a variety of different languages:</Text>
        <List spacing='xs'>
          <List.Item><strong>MakeCode</strong> - MakeCode Arcade is a Scratch-like editor that lets you create <em>games and stories</em> using drag and drop blocks. Recommended for younger ninjas.</List.Item>
          <List.Item><strong>Scratch</strong> - Scratch is the original block-based programming language that lets you create <em>games and stories</em> using drag and drop. Great for younger ninjas, but also used by older ninjas too.</List.Item>
          <List.Item><strong>HTML + CSS</strong> - HTML and CSS are the building blocks of the web. Learn how to create your own <em>web pages</em> to tell a story, and even throw in some interactivity using JavaScript.</List.Item>
          <List.Item><strong>Python</strong> - We have some python projects for levels 2 and 3. More advanced ninjas who are ready to learn a text-based programming language should give it a try.</List.Item>
        </List>
        <Heading3>Want to go rogue?</Heading3>
        <Text mb='md'>You aren't limited to the projects we list here. Feel free to search on any of the following sites for something else cool to work on:</Text>
        <List spacing='xs'>
          <List.Item><TextLink href='https://arcade.makecode.com'>arcade.makecode.com</TextLink></List.Item>
          <List.Item><TextLink href='https://projects.raspberrypi.org/en/projects'>projects.raspberrypi.org</TextLink></List.Item>
          <List.Item><TextLink href='https://scratch.mit.edu/ideas'>scratch.mit.edu</TextLink></List.Item>
        </List>
      </>
    }
    images={[
      {
        src: makecodeEditor,
        alt: 'MakeCode Arcade editor',
        caption: (
          <>
            Creating a visual story in <strong>MakeCode Arcade</strong>
          </>
        ),
      },
      {
        src: bookReader,
        alt: 'Book reader',
        caption: <>What idea for a story do you have?</>,
      },
    ]}
  />
)
