import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { faGifts } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import christmasJumper from 'image/christmas_jumper.png'
import sonicPiCode from 'image/sonic_pi_code.png'
import React from 'react'

export const Christmas = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          Christmas{' '}
          <chakra.span color={'red.600'}>
            <FontAwesomeIcon icon={faGifts} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          <strong>It's cold and dark, but Santa is on the way,</strong> so let's get festive and do some Christmas coding!
        </Text>
        <Text my={2}>
          We have <strong>FIVE</strong> awesome <strong>winter themed projects</strong>, using a variety of <strong>different languages:</strong>
        </Text>
        <Heading3>Scratch</Heading3>
        <UnorderedList>
          <ListItem>
            <strong>Scratch Cat goes skiing</strong> - Create a downhill skiiing game where the goal is to dodge the trees and other obstacles to score as many
            points as possible.
          </ListItem>
          <ListItem>
            <strong>Jazzy jumpers</strong> - Create a memory game based on funky Christmas jumper designs.
          </ListItem>
          <ListItem>
            <strong>Snowball fight</strong> - Create a game where the aim is to hit a target by throwing snowballs of varying strengths.
          </ListItem>
        </UnorderedList>
        <Heading3>Python</Heading3>
        <UnorderedList>
          <ListItem>
            <strong>Turtle snowflakes</strong> - Create some awesome snowflake patterns. Great for beginner to internediate python coders.
          </ListItem>
        </UnorderedList>
        <Heading3>Sonic Pi</Heading3>
        <UnorderedList>
          <ListItem>
            <strong>Code a christmas carol</strong> - Learn how to use Sonic Pi, an awesome music creation tool that allows you to create music through code.
            Here we make the 12 Days of Christmas song that you should all be familiar with!
          </ListItem>
        </UnorderedList>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Image src={christmasJumper} rounded={5} />
          <Text m={3}>
            Can you remember what the <strong>Christmas jumper</strong> looked like?
          </Text>
        </Box>
        <Box>
          <Image src={sonicPiCode} rounded={5} />
          <Text m={3}>
            <strong>Sonic Pi Code</strong> - Highly recommended for anyone that loves music! 🎵
          </Text>
        </Box>
      </Stack>
    </Flex>
  </>
)
