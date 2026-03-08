import { Box, Button, chakra, Flex, Heading, Image, Link, ListItem, Spacer, Stack, Text, UnorderedList } from 'legacy-ui'
import { fa1, fa2, fa3, faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import birthdayCard from 'image/birthday-card.png'
import pixelArt from 'image/pixel-art.png'
import React from 'react'

export const WebDesign = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          Web Design{' '}
          <chakra.span color={'red.400'}>
            <FontAwesomeIcon icon={faCode} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          Making websites is a very important skill to have. You can use it to create your own blog, portfolio, or even a website for your business. There are
          usually three different technologies involved when create a website: <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.
        </Text>
        <Text my={5}>
          <strong>HTML</strong> is the language that is used to create the structure of a website. It tells the browser <i>what</i> to display on the page.
        </Text>
        <Text my={5}>
          <strong>CSS</strong> is the language that is used to style a website. It tells the browser <i>how</i> to display the elements on the page.
        </Text>
        <Text my={5}>
          <strong>JavaScript</strong> is a programming language that is used to make a website interactive. It can be used to create animations, games, and even
          entire applications that can be accessed through a web browser.
        </Text>
        <Text my={5}>
          Check out the <strong>Web Design</strong> tracks below, each at a different level:
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


