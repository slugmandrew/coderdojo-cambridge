import { Anchor, Box, Button, Card, Divider, Group, Image, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { faCalendarDays, faCode, faExternalLinkAlt, faLocationDot, faPeopleGroup, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import mainPhoto from 'image/we-made-this.png'
import banner from 'image/coding_banner.jpg'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const dojoDates = [
  { month: 'January', day: '10th' },
  { month: 'February', day: '14th' },
  { month: 'March', day: '14th' },
  { month: 'April', day: '11th' },
  { month: 'May', day: '9th' },
  { month: 'June', day: '13th' },
  { month: 'September', day: '12th' },
  { month: 'October', day: '10th' },
  { month: 'November', day: '14th' },
  { month: 'December', day: '12th' },
]

const HomeLinkCard = ({ icon, title, to, color, children }: { icon: any; title: string; to: string; color: string; children: React.ReactNode }) => (
  <ContentCard noMargin>
    <Box p='lg'>
      <Group spacing='sm' mb='sm'>
        <ThemeIcon size='lg' radius='xl' color={color} variant='light'>
          <FontAwesomeIcon icon={icon} />
        </ThemeIcon>
        <Anchor component={RouterLink} to={to} underline={false} fw={700} color={color}>
          {title}
        </Anchor>
      </Group>
      <Text>{children}</Text>
    </Box>
  </ContentCard>
)

const HomeImagePanel = ({ image, alt, title, description }: { image: string; alt: string; title: string; description: string }) => (
  <Card shadow='sm' padding='lg' radius='md' withBorder>
    <Card.Section>
      <Image src={image} alt={alt} />
    </Card.Section>
    <Group mt={'md'}>
      <Text fw={700} mb={4}>
        {title}
      </Text>
    </Group>
    <Group>
      <Text size='sm' c='dimmed'>
        {description}
      </Text>
    </Group>
  </Card>
)

export const Home = () => (
  <Stack spacing='xl'>
    <SimpleGrid cols={2} spacing='lg' breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <Paper
        radius='md'
        p='xl'
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.white} 100%)`,
          border: `1px solid ${theme.colors.gray[2]}`,
        })}>
        <Stack spacing='lg'>
          <Box>
            <Text c='dojoOrange.6' fw={700} tt='uppercase' size='sm' mb='xs'>
              Community Coding Club
            </Text>
            <Title order={1} sx={{ lineHeight: 1.05 }}>
              Coding, creativity, and hands-on projects for young people in Cambridge
            </Title>
          </Box>

          <Paragraph>We are a free, community-run coding club for young people aged 7-17.</Paragraph>
          <Paragraph>
            Sessions run monthly in <strong>Central Cambridge</strong>, usually on the <strong>second Saturday of the month</strong>, with projects for complete
            beginners and experienced coders alike.
          </Paragraph>
          <Paragraph>
            We explore Scratch, Python, HTML, Java, Unity (C#), physical computing and more, with support from mentors who love helping young people build
            things.
          </Paragraph>

          <Group>
            <Button
              component='a'
              href='https://coderdojo.com/en/dojos/gb/cambridge/cambridge-makespace'
              target='_blank'
              color='dojoOrange'
              rightIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}>
              Sign Up
            </Button>
            <Button component={RouterLink} to='/projects' variant='light' color='dojoTeal'>
              Browse Projects
            </Button>
          </Group>

          <Text size='sm' c='dimmed'>
            We work on many different types of <NavLink to='/projects'>projects</NavLink>, from visual coding in{' '}
            <TextLink href='https://scratch.mit.edu/'>Scratch</TextLink> and{' '}
            <TextLink href='https://makecode.microbit.org/#editor'>Micro:Bit MakeCode</TextLink> to physical computing with{' '}
            <TextLink href='https://www.raspberrypi.com/'>Raspberry Pi</TextLink> and <TextLink href='https://www.arduino.cc/'>Arduino</TextLink>.
          </Text>
        </Stack>
      </Paper>

      <Stack spacing='md'>
        <HomeImagePanel
          image={mainPhoto}
          alt='CoderDojo projects'
          title='Projects Built Together'
          description='A snapshot of the kinds of practical, creative work ninjas make at the dojo.'
        />
        <HomeImagePanel
          image={banner}
          alt='Coding banner'
          title='Hands-On Sessions'
          description='Each session mixes guided support, personal projects, and time to experiment.'
        />
      </Stack>
    </SimpleGrid>

    <SimpleGrid cols={2} spacing='lg' breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <ContentCard noMargin>
        <Box p='lg'>
          <Group spacing='sm' mb='md'>
            <ThemeIcon size='lg' radius='xl' color='blue' variant='light'>
              <FontAwesomeIcon icon={faCalendarDays} />
            </ThemeIcon>
            <Heading2 color='dojoTeal.7'>Dojo Calendar</Heading2>
          </Group>

          <Stack spacing='xs'>
            <Text fw={700}>2026</Text>
            {dojoDates.slice(0, 6).map((date) => (
              <Text key={date.month} c='blue.6'>
                Saturday{' '}
                <Text span fw={700}>
                  {date.day} {date.month}
                </Text>
              </Text>
            ))}
            <Divider my='xs' />
            <Text fw={700} c='green.6'>
              Summer Break
            </Text>
            <Divider my='xs' />
            {dojoDates.slice(6).map((date) => (
              <Text key={date.month} c='blue.6'>
                Saturday{' '}
                <Text span fw={700}>
                  {date.day} {date.month}
                </Text>
              </Text>
            ))}
          </Stack>

          <Paper mt='xl' p='md' radius='md' bg='gray.0'>
            <Text>
              <strong>Note:</strong> Sessions usually run on the <u>second Saturday</u> of the month and you must have a ticket to attend.
            </Text>
          </Paper>
        </Box>
      </ContentCard>

      <ContentCard noMargin>
        <Box p='lg'>
          <Group spacing='sm' mb='md'>
            <ThemeIcon size='lg' radius='xl' color='dojoOrange' variant='light'>
              <FontAwesomeIcon icon={faLocationDot} />
            </ThemeIcon>
            <Heading2 color='dojoOrange.6'>What To Expect</Heading2>
          </Group>

          <Stack spacing='md'>
            <Text>
              Whether you are a seasoned coder or have never coded before, you are welcome at our dojo. Bring a project you already care about, or we can help
              you find a great starting point.
            </Text>
            <Text>
              Parents are encouraged to get involved, and younger ninjas can attend with support from an adult. We aim to make the club friendly, practical, and
              easy to join.
            </Text>
            <Group>
              <Button component={RouterLink} to='/location' variant='light' color='blue'>
                Find Us
              </Button>
              <Button component={RouterLink} to='/parents' variant='light' color='red'>
                Parent Info
              </Button>
            </Group>
          </Stack>
        </Box>
      </ContentCard>
    </SimpleGrid>

    <SimpleGrid
      cols={3}
      spacing='lg'
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}>
      <HomeLinkCard icon={faCode} title='Projects' to='/projects' color='teal'>
        Guided project ideas for different ages, interests, and skill levels.
      </HomeLinkCard>
      <HomeLinkCard icon={faUserGroup} title='Topics' to='/topics' color='yellow'>
        Explore the languages, tools, and technologies we like to teach.
      </HomeLinkCard>
      <HomeLinkCard icon={faLocationDot} title='Location' to='/location' color='violet'>
        Find the venue, address details, and map directions.
      </HomeLinkCard>
      <HomeLinkCard icon={faPeopleGroup} title='Ninjas' to='/ninjas' color='blue'>
        Everything young people need to know before coming along.
      </HomeLinkCard>
      <HomeLinkCard icon={faPeopleGroup} title='Parents' to='/parents' color='red'>
        Practical information for families, guardians, and first visits.
      </HomeLinkCard>
      <HomeLinkCard icon={faUserGroup} title='Mentors' to='/mentors' color='green'>
        Learn more about the volunteers who support the dojo.
      </HomeLinkCard>
    </SimpleGrid>
  </Stack>
)
