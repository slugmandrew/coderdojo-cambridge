import { Box, Button, chakra, Flex, Heading, Image, Link, ListItem, Spacer, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { fa1, fa2, fa3, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import birthdayCard from 'image/birthday-card.png'
import pixelArt from 'image/pixel-art.png'
import React from 'react'

export const Season05 = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'lg'} color={'custom.orange'} my={5}>
          Season 05
        </Heading>
        <Heading size={'xl'}>
          Web Design - HTML & CSS{' '}
          <chakra.span color={'red.400'}>
            <FontAwesomeIcon icon={faCode} />
          </chakra.span>
        </Heading>
        <Heading size={'sm'} color={'teal.400'} my={1}>
          April - July :: 2024
        </Heading>
        <Text my={5}>
          Our focus this season is all about <b>making websites</b>.
        </Text>
        <Text my={5}>
          We have three <strong>HTML & CSS tracks</strong>, each at a different level:
        </Text>
        <UnorderedList>
          <ListItem>
            <strong>Module 1</strong> - Start here if you've never built a web page before. Projects include creating a digital birthday card, story, and wanted
            poster. At the end you create a web page that lists all of your earlier projects.
          </ListItem>
          <ListItem>
            <strong>Module 2</strong> - Start here if you have built web pages in the past. Projects include building a robot, stickers and an animated sunrise.
            The final task is to make a pixel art application!
          </ListItem>
          <ListItem>
            <strong>Module 3</strong> - An advanced track where you build a complex site with a navigation bar, footer, and animations.
          </ListItem>
        </UnorderedList>

        <Stack direction={['column', null, 'row']} mt={'10'}>
          <Button size={'lg'} color={'custom.orange'} variant={'outline'} as={'a'} href={'http://rpf.io/webdev-module-1'} target={'_blank'}>
            Open Module 1
          </Button>
          <Button size={'lg'} color={'custom.orange'} variant={'outline'} as={'a'} href={'http://rpf.io/webdev-module-2'} target={'_blank'}>
            Open Module 2
          </Button>
          <Button size={'lg'} color={'custom.orange'} variant={'outline'} as={'a'} href={'http://rpf.io/html-css-for-social-enterprise'} target={'_blank'}>
            Open Module 3
          </Button>
        </Stack>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Image src={birthdayCard} rounded={5} />
          <Text m={3}>
            Create a <strong>birthday card</strong> for a friend or family member!
          </Text>
        </Box>
        <Box>
          <Image src={pixelArt} rounded={5} />
          <Text m={3}>
            Coding a <strong>pixel art</strong> application
          </Text>
        </Box>
      </Stack>
    </Flex>
  </>
)
