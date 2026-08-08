import { Button, Group, List, Text } from '@mantine/core'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopicLayout } from 'components/TopicLayout'
import birthdayCard from 'image/birthday-card.png'
import pixelArt from 'image/pixel-art.png'
import React from 'react'

export const WebDesign = () => (
  <TopicLayout
    title={
      <>
        Web Design <FontAwesomeIcon icon={faCode} color='#fa5252' />
      </>
    }
    body={
      <>
        <Text mb='md'>
          Making websites is a very important skill to have. You can use it to create your own blog, portfolio, or even a website for your business. There are
          usually three different technologies involved when create a website: <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.
        </Text>
        <Text mb='md'>
          <strong>HTML</strong> is the language that is used to create the structure of a website. It tells the browser <i>what</i> to display on the page.
        </Text>
        <Text mb='md'>
          <strong>CSS</strong> is the language that is used to style a website. It tells the browser <i>how</i> to display the elements on the page.
        </Text>
        <Text mb='md'>
          <strong>JavaScript</strong> is a programming language that is used to make a website interactive. It can be used to create animations, games, and even
          entire applications that can be accessed through a web browser.
        </Text>
        <Text mb='md'>
          Check out the <strong>Web Design</strong> tracks below, each at a different level:
        </Text>
        <List spacing='xs' mb='md'>
          <List.Item>
            <strong>Module 1</strong> - Start here if you've never built a web page before. Projects include creating a digital birthday card, story, and wanted
            poster. At the end you create a web page that lists all of your earlier projects.
          </List.Item>
          <List.Item>
            <strong>Module 2</strong> - Start here if you have built web pages in the past. Projects include building a robot, stickers and an animated sunrise.
            The final task is to make a pixel art application.
          </List.Item>
          <List.Item>
            <strong>Module 3</strong> - An advanced track where you build a complex site with a navigation bar, footer, and animations.
          </List.Item>
        </List>
        <Group>
          <Button component='a' href='http://rpf.io/webdev-module-1' target='_blank' variant='outline' color='clubOrange'>
            Open Module 1
          </Button>
          <Button component='a' href='http://rpf.io/webdev-module-2' target='_blank' variant='outline' color='clubOrange'>
            Open Module 2
          </Button>
          <Button component='a' href='http://rpf.io/html-css-for-social-enterprise' target='_blank' variant='outline' color='clubOrange'>
            Open Module 3
          </Button>
        </Group>
      </>
    }
    images={[
      {
        src: birthdayCard,
        alt: 'Birthday card project',
        caption: (
          <>
            Create a <strong>birthday card</strong> for a friend or family member!
          </>
        ),
      },
      {
        src: pixelArt,
        alt: 'Pixel art app',
        caption: (
          <>
            Coding a <strong>pixel art</strong> application
          </>
        ),
      },
    ]}
  />
)
