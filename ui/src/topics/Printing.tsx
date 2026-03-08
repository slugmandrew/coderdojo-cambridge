import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from 'legacy-ui'
import { faBook, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading3 } from 'components/Heading3'
import { TextLink } from 'components/TextLink'
import printer from 'image/printer.png'
import schematic from 'image/printing-schematic.png'
import React from 'react'

export const Printing = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          3D Printing{' '}
          <chakra.span color={'gray.600'}>
            <FontAwesomeIcon icon={faPrint} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          Did you know you can make almost anything in a <b>3D Printer</b>?.
        </Text>
        <Text my={5}>
          We have three <strong>cool projects</strong> to get you started here:
        </Text>
        <Heading3>Want to get creative?</Heading3>
        <Text my={5}></Text>
        You aren't limited to the projects we list here!
        <Text my={5}>
          Feel free to come up with your own ideas for things to print! It can be anything your imagination can think of. Here's some ideas to get you started:
        </Text>
        <UnorderedList>
          <ListItem>
            <strong>Minecraft characters</strong>
          </ListItem>
          <ListItem>
            <strong>A sign for your bedroom door</strong>
          </ListItem>
          <ListItem>
            <strong>A model of one of your pets</strong>
          </ListItem>
          <ListItem>
            <strong>A model of one of your parents (be nice!)</strong>
          </ListItem>
        </UnorderedList>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Text m={3}>
            3D Printers work by adding <strong>layers of filament one after the other</strong>
          </Text>
        </Box>
        <Box>
          <Image src={schematic} rounded={5} ml={100} w={250} />
          <Text m={3} fontWeight={700}>
            What do you want to make today?
          </Text>
        </Box>
      </Stack>
    </Flex>
  </>
)


