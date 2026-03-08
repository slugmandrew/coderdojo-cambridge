import { Anchor, Box, Button, Grid, Image, List, Stack, Text, Title } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import mainPhoto from 'image/we-made-this.png'
import banner from 'image/coding_banner.jpg'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => (
  <Stack spacing='md'>
    <Box style={{ overflow: 'hidden', borderRadius: 8 }}>
      <Image src={mainPhoto} radius='md' h={460} fit='cover' />
    </Box>

    <Grid align='stretch'>
      <Grid.Col span={12} md={8}>
        <ContentCard noMargin>
          <Heading2>Welcome to our dojo!</Heading2>
          <Paragraph>We are a free, community-run coding club for young people aged 7-17.</Paragraph>
          <Paragraph>
            We are located in <b>Central Cambridge</b> and sessions run every month, on the <b>second Saturday of the month</b>.
          </Paragraph>
          <Paragraph>We learn to code in Scratch, Python, HTML, Java, Unity (C#) and more.</Paragraph>
          <Paragraph>
            We work on lots of <NavLink to='/projects'>projects</NavLink>, from <TextLink href='https://scratch.mit.edu/'>Scratch</TextLink> to{' '}
            <TextLink href='https://www.raspberrypi.com/'>Raspberry Pi</TextLink> and <TextLink href='https://www.arduino.cc/'>Arduino</TextLink>.
          </Paragraph>
          <Box style={{ overflow: 'hidden', borderRadius: 8 }} mt='sm'>
            <Image src={banner} h={280} fit='cover' />
          </Box>
        </ContentCard>
      </Grid.Col>

      <Grid.Col span={12} md={4}>
        <ContentCard noMargin>
          <Heading2 center>Dojo Calendar 2026</Heading2>
          <List spacing='xs' mb='md'>
            <List.Item>10 Jan</List.Item><List.Item>14 Feb</List.Item><List.Item>14 Mar</List.Item><List.Item>11 Apr</List.Item><List.Item>9 May</List.Item><List.Item>13 Jun</List.Item>
            <List.Item><b>Summer Break</b></List.Item>
            <List.Item>12 Sep</List.Item><List.Item>10 Oct</List.Item><List.Item>14 Nov</List.Item><List.Item>12 Dec</List.Item>
          </List>
          <Text size='sm' ta='center' mb='sm'>Sessions usually run on the second Saturday of each month. Tickets required.</Text>
          <Button component='a' href='https://coderdojo.com/en/dojos/gb/cambridge/cambridge-makespace' target='_blank' color='orange' fullWidth>
            Sign Up on CoderDojo
          </Button>
        </ContentCard>
      </Grid.Col>
    </Grid>

    <Grid>
      {[
        ['Projects', '/projects', 'Recommended projects for new and returning ninjas.'],
        ['Topics', '/topics', 'Languages and technologies we cover.'],
        ['Location', '/location', 'Find us at Makespace on Mill Lane.'],
        ['Ninjas', '/ninjas', 'What ninjas can expect at CoderDojo.'],
        ['Parents', '/parents', 'Info for parents and guardians.'],
        ['Mentors', '/mentors', 'Interested in volunteering? Get in touch.'],
      ].map(([title, to, text]) => (
        <Grid.Col key={to} span={12} sm={6} lg={4}>
          <ContentCard noMargin>
            <Title order={3}><Anchor component={Link} to={to as string}>{title}</Anchor></Title>
            <Text mt='sm'>{text}</Text>
          </ContentCard>
        </Grid.Col>
      ))}
    </Grid>
  </Stack>
)
