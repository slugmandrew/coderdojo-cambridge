import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TextLink } from 'components/TextLink'
import bookReader from 'image/book-reader.png'
import makecodeEditor from 'image/makecode-arcade.png'
import React from 'react'

export const Season04 = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'lg'} color={'custom.orange'} my={5}>
          Season 04
        </Heading>
        <Heading size={'xl'}>
          Code your own stories{' '}
          <chakra.span color={'blue.400'}>
            <FontAwesomeIcon icon={faBook} />
          </chakra.span>
        </Heading>
        <Heading size={'sm'} color={'teal.400'} my={1}>
          MAY - SEPTEMBER :: 2023
        </Heading>
        <Text my={5}>
          Our focus this season is all about <b>coding stories</b>.
        </Text>
        <Text my={5}>
          Instead of focusing on a particular language or piece of hardware like we have done previously, we decided to try a general theme - you can code a
          story or adventure in any language you like!
        </Text>
        <Text my={5}>
          We have some <strong>suggested projects</strong> in a variety of different languages:
        </Text>
        <UnorderedList>
          <ListItem>
            <strong>MakeCode</strong> - MakeCode Arcade is a Scratch-like editor that lets you create <em>games and stories</em> using drag and drop blocks.
            Recommended for younger ninjas!
          </ListItem>
          <ListItem>
            <strong>Scratch</strong> - Scratch is the original block-based programming language that lets you create <em>games and stories</em> using drag and
            drop. Great for younger ninjas, but also used by older ninjas too!
          </ListItem>
          <ListItem>
            <strong>HTML + CSS</strong> - HTML and CSS are the building blocks of the web. Learn how to create your own <em>web pages</em> to tell a story, and
            even throw in some interactivity using JavaScript - the language of the web!
          </ListItem>
          <ListItem>
            <strong>Python</strong> - We have some python projects for levels 2 and 3 - more advanced ninjas who are ready to learn a text-based programming
            should give it a try!
          </ListItem>
        </UnorderedList>
        <Heading3>Want to go rogue?</Heading3>
        <Text my={5}></Text>
        You aren't limited to the projects we list here!
        <Text my={5}>Feel free to search on any of the following sites for something else cool to work on:</Text>
        <UnorderedList>
          <ListItem>
            <TextLink href={'https://arcade.makecode.com'}>arcade.makecode.com</TextLink>
          </ListItem>
          <ListItem>
            <TextLink href={'https://projects.raspberrypi.org/en/projects'}>projects.raspberrypi.org</TextLink>
          </ListItem>
          <ListItem>
            <TextLink href={'https://scratch.mit.edu/ideas'}>scratch.mit.edu</TextLink>
          </ListItem>
        </UnorderedList>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Image src={makecodeEditor} rounded={5} />
          <Text m={3}>
            Creating a visual story in <strong>MakeCode Arcade</strong>
          </Text>
        </Box>
        <Box>
          <Image src={bookReader} rounded={5} />
          <Text m={3}>What idea for a story do you have?</Text>
        </Box>
      </Stack>
    </Flex>
  </>
)
