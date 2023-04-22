import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import React from 'react'
import { Heading3 } from '../components/Heading3'
import { Text, Image, HStack, Box, Flex, VStack, Stack, Center, ListItem, UnorderedList, Link } from '@chakra-ui/react'
import { TextLink } from '../components/TextLink'
import teleportingDuck from 'image/microbit-teleporting-duck.png'
import leds from 'image/microbit_show_leds.png'
import icons from 'image/microbit-icons.png'
import gestures from 'image/microbit-gestures.png'
import multiple from 'image/microbit-multiple-received.png'
import group from 'image/microbit-group-duck.png'
import { ContentPanel } from '../components/ContentPanel'
import { ExternalLinkIcon, DownloadIcon } from '@chakra-ui/icons'

const Thing = () => {
  return <div>Thing</div>
}

export const Workshops = () => {
  return (
    <Box>
      <PageHeading>Workshops</PageHeading>
      <Stack direction={['column', 'row']} justifyContent={'space-between'}>
        <Heading2>Teleporting Animals with Micro:Bit</Heading2>
        <Heading3 color={'teal'}>22nd April 23</Heading3>
      </Stack>

      <ContentPanel>
        <Stack direction={['column', 'row']} p={5} pb={10} justifyContent={'space-between'}>
          <Box>
            <Paragraph>Welcome to CamJam 2023!</Paragraph>
            <Paragraph>
              <strong>Today we'll be teleporting animals from one micro:bit to another!</strong>
            </Paragraph>
            <Paragraph>
              Micro:bits are small circuit boards with <strong>LEDs</strong>, <strong>buttons</strong>, an <strong>accelerometer</strong>,{' '}
              <strong>compass</strong>, and <strong>light</strong> and <strong>temperature</strong> sensors all included!
            </Paragraph>
            <Paragraph>
              There are two ways to code on a micro:bit: Using the visual MakeCode editor (a bit like Scratch) or using regular python code (more advanced).
            </Paragraph>
            <Heading3>Setup</Heading3>
            <UnorderedList>
              <ListItem>
                Open the MakeCode editor on{' '}
                <TextLink href={'https://microbit.org/code/'}>
                  https://microbit.org/code <ExternalLinkIcon mx='2px' />
                </TextLink>
              </ListItem>
              <ListItem>
                Ensure you have <strong>two micro:bits</strong>, a <strong>USB cable</strong> and a <strong>battery pack</strong>
              </ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Image src={teleportingDuck} />
          </Box>
        </Stack>
      </ContentPanel>

      <ContentPanel>
        <Box p={5}>
          <Heading3>Task 1 - Teleporting Animal 🦆</Heading3>
          <Paragraph>
            Follow the{' '}
            <TextLink href={'https://microbit.org/projects/make-it-code-it/teleporting-duck/'} target='_blank' isExternal={true}>
              "Teleporting Duck" tutorial on the micro:bit website <ExternalLinkIcon mx='2px' />
            </TextLink>
          </Paragraph>
          <Paragraph>
            Let's make things a bit more exciting though - <strong>choose your own animal</strong> from the set of predefined images, or you could even draw one
            yourself!
          </Paragraph>

          <Center>
            <Stack direction={['column', 'row']}>
              <Image src={icons} height={300} />
              <Text fontSize={'3xl'} fontWeight={'bold'} color={'blue.600'} p={50}>
                - OR -
              </Text>
              <Image src={leds} />
            </Stack>
          </Center>
        </Box>
      </ContentPanel>

      <ContentPanel>
        <Stack direction={['column', 'row']} justifyContent={'space-between'} p={5}>
          <Box>
            <Heading3>Task 2 - Change the Gesture 👋</Heading3>
            <Paragraph>Now that you've got your two microbits sending messages, let's change how we trigger it.</Paragraph>
            <Paragraph>Try to change the gesture used to send the message.</Paragraph>
            <Paragraph>
              Currently, you're using <code>shake</code>, but there are many other options available. Try using <code>tilt left</code> or{' '}
              <code>tilt right</code>.
            </Paragraph>
          </Box>
          <Box>
            <Image src={gestures} />
          </Box>
        </Stack>
      </ContentPanel>
      <ContentPanel>
        <Box>
          <Stack justifyContent={'space-between'} direction={['column', 'row']}>
            <Box px={5}>
              <Heading3>Task 3 - Multiple Animals 🦙⬅🦙</Heading3>
              <Paragraph>You've changed your gesture... good job! 👍</Paragraph>
              <Paragraph>Now let's think about improving our program some more.</Paragraph>
              <Paragraph>
                Can you think of a way to send <strong>more than one animal</strong> back and forth?
              </Paragraph>
              <Paragraph>
                Here's a <code>code block</code> using an <code>if-else</code> statement to get you started:
              </Paragraph>
            </Box>
            <Box p={5}>
              <Image src={multiple} />
            </Box>
          </Stack>
        </Box>
      </ContentPanel>
      <ContentPanel>
        <Box p={5}>
          <Heading3>Task 4 - Group Ducks</Heading3>
          <Paragraph>Now we'll all play a game together.</Paragraph>
          <Paragraph>
            Our current code wouldn't work for more than two players. This time, we'll all write the same program, which works for any number of players.
          </Paragraph>
          <Paragraph>
            Download the{' '}
            <TextLink href={'microbit-Group-Ducks---Challenge.hex'}>
              <DownloadIcon mx='2px' />
              microbit-Group-Ducks---Challenge.hex
            </TextLink>{' '}
            file and load it into MakeCode.
          </Paragraph>
          <Paragraph>
            We need to set some <code>variables</code> - look for the comments at the top of the file.
          </Paragraph>
          <Paragraph>
            Next, finish the program by adding the code blocks into the <code>if-else</code> statement.
          </Paragraph>
          <Image src={group}></Image>
        </Box>
      </ContentPanel>
    </Box>
  )
}
