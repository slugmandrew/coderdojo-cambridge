import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from 'legacy-ui'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TextLink } from 'components/TextLink'
import microBitHeadphones from 'image/microbit_headphones.png'
import microBitInHands from 'image/microbit_in_hands.png'
import React from 'react'

export const MicroBit = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          A bit of micro:bit{' '}
          <chakra.span color={'gray.600'}>
            <FontAwesomeIcon icon={faMicrochip} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          Micro:bits are small circuit boards with <strong>LEDs</strong>, <strong>buttons</strong>, an <strong>accelerometer</strong>, <strong>compass</strong>,
          and <strong>light</strong> and <strong>temperature</strong> sensors all included!
        </Text>
        <Text my={5}>
          There are two ways to code on a micro:bit: Using the visual MakeCode editor (a bit like Scratch) or using regular python code (more advanced).
        </Text>
        <Text my={5}>As always, we have projects across three different levels:</Text>
        <UnorderedList>
          <ListItem>
            <strong>Level 1</strong> - Here we focus on the basics of micro:bit and what it can do. The projects mainly focus on interaction using the built-in
            LEDS and buttons, and the projects all use the visual code block editor. Recommended for ages 7-10.
          </ListItem>
          <ListItem>
            <strong>Level 2</strong> - Next we move on to more advanced control, using loops and conditions to program some more sophisticated logic. There are
            options to continue using the visual code editor, or move on to writing code in Python. Recommended for ages 9-13.
          </ListItem>
          <ListItem>
            <strong>Level 3</strong> - Finally, we have some more advanced projects that use multiple micro:bits and take advantage of the sensors and radio
            communication capabilities that micro:bit has. Recommended for ages 12-17.
          </ListItem>
        </UnorderedList>

        <Heading3>Want to go rogue?</Heading3>
        <Text my={5}>
          You aren't limited to the projects we list here! Feel free to search on <TextLink href={'http://microbit.org'}>microbit.org</TextLink> for something
          else cool to work on.
        </Text>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Image src={microBitInHands} rounded={5} />
          <Text m={3}>
            A student using the <strong>MakeCode editor</strong>
          </Text>
        </Box>
        <Box>
          <Image src={microBitHeadphones} rounded={5} />
          <Text m={3}>
            You can do some really <strong>cool things</strong> with micro:bits!
          </Text>
        </Box>
      </Stack>
    </Flex>
  </>
)


