import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import microBitHeadphones from 'image/microbit_headphones.png'
import microBitInHands from 'image/microbit_in_hands.png'
import React from 'react'

export const Season03 = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'lg'} color={'custom.orange'} my={5}>
          Season 03
        </Heading>
        <Heading size={'xl'}>
          A bit of micro:bit{' '}
          <chakra.span color={'gray.600'}>
            <FontAwesomeIcon icon={faMicrochip} />
          </chakra.span>
        </Heading>
        <Heading size={'sm'} color={'teal.400'} my={1}>
          JANUARY - APRIL :: 2023
        </Heading>
        <Text my={5}>
          Our focus this season is all about <b>learning to use micro:bits</b>.
        </Text>
        <Text my={5}>Micro:bits are small circuit boards with LEDs, buttons, an accelerometer, compass, and light and temperature sensors all included!</Text>
        <Text my={5}>
          There are two ways to code on a micro:bit: Using the visual MakeCode editor (a bit like Scratch) or using regular python code (more advanced).
        </Text>
        <Text my={5}>As always, we have projects across three different levels:</Text>

        <UnorderedList>
          <ListItem>
            <strong>Level 1</strong> -
          </ListItem>
          <ListItem>
            <strong>Level 2</strong> -
          </ListItem>
          <ListItem>
            <strong>Level 3</strong> -
          </ListItem>
        </UnorderedList>
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
