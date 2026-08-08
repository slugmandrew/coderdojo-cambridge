import { Anchor, Box, Button, Card, Group, Image, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { faArrowRight, faCode, faLocationDot, faPeopleGroup, faTicket, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ScheduleCalendar } from 'components/ScheduleCalendar'
import { TextLink } from 'components/TextLink'
import banner from 'image/coding_banner.jpg'
import mainPhoto from 'image/we-made-this.png'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Link as RouterLink } from 'react-router'

const QuickLink = ({ icon, title, to, children }: { icon: IconDefinition; title: string; to: string; children: React.ReactNode }) => (
  <Card component={RouterLink} to={to} padding='lg' radius='xl' className='quick-link' withBorder>
    <Group justify='space-between' wrap='nowrap'>
      <ThemeIcon size={44} radius='xl' color='dojoTeal' variant='light'>
        <FontAwesomeIcon icon={icon} />
      </ThemeIcon>
      <FontAwesomeIcon icon={faArrowRight} />
    </Group>
    <Title order={3} mt='lg' mb={6}>
      {title}
    </Title>
    <Text c='dimmed' size='sm'>
      {children}
    </Text>
  </Card>
)

export const Home = () => (
  <Stack gap={64}>
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'xl', md: 56 }} verticalSpacing='xl'>
      <Stack justify='center' gap='lg' py={{ md: 48 }}>
        <Text className='eyebrow'>Free community coding club · Ages 7–17</Text>
        <Title order={1} className='hero-title'>
          Make something{' '}
          <Text span c='dojoOrange.6' inherit>
            brilliant.
          </Text>
        </Title>
        <Text size='xl' c='gray.7' maw={620} lh={1.6}>
          We are a free, community-run coding club for young people aged 7-17. Sessions run monthly in <strong>Central Cambridge</strong>, usually on the{' '}
          <strong>second Saturday of the month</strong>, with projects for complete beginners and experienced coders alike.
        </Text>
        <Group>
          <Button
            component='a'
            href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'
            target='_blank'
            size='lg'
            color='dojoOrange'
            leftSection={<FontAwesomeIcon icon={faTicket} />}>
            Book a session
          </Button>
          <Button component='a' href='#calendar' size='lg' variant='subtle' color='dojoTeal'>
            See dates
          </Button>
        </Group>
        <Group gap='xl' mt='sm'>
          <Box>
            <Text fw={900} size='xl'>
              Free
            </Text>
            <Text size='sm' c='dimmed'>
              Always
            </Text>
          </Box>
          <Box>
            <Text fw={900} size='xl'>
              7–17
            </Text>
            <Text size='sm' c='dimmed'>
              All abilities
            </Text>
          </Box>
          <Box>
            <Text fw={900} size='xl'>
              Monthly
            </Text>
            <Text size='sm' c='dimmed'>
              At Makespace
            </Text>
          </Box>
        </Group>
      </Stack>

      <Box className='hero-gallery' aria-label='Pictures from CoderDojo Cambridge'>
        <Image src={mainPhoto} alt='Young people showing projects built at CoderDojo' className='hero-gallery-main' />
        <Image src={banner} alt='A young coder working on a laptop' className='hero-gallery-secondary' />
        <Paper className='hero-gallery-note' p='md' radius='lg'>
          <Text fw={900}>Ideas become real here.</Text>
          <Text size='sm' c='dimmed'>
            Build, experiment and share.
          </Text>
        </Paper>
      </Box>
    </SimpleGrid>

    <ScheduleCalendar />

    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'xl', md: 64 }}>
      <Box>
        <Text className='eyebrow'>What happens at a dojo?</Text>
        <Title order={2} mt='sm' mb='lg'>
          Learn by making, with a mentor nearby.
        </Title>
        <Text size='lg' lh={1.7} mb='md'>
          We explore Scratch, Python, HTML, Java, Unity (C#), physical computing and more, with support from mentors who love helping young people build things.
        </Text>
        <Text size='lg' lh={1.7} mb='md'>
          Whether you are a seasoned coder or have never coded before, you are welcome at our dojo. Bring a project you already care about, or we can help you
          find a great starting point.
        </Text>
        <Text size='lg' lh={1.7}>
          Parents are encouraged to get involved, and younger ninjas can attend with support from an adult. We aim to make the club friendly, practical, and
          easy to join.
        </Text>
      </Box>
      <Paper p={{ base: 'lg', sm: 'xl' }} radius='xl' bg='dojoOrange.0' shadow='none'>
        <Text fw={900} size='lg' mb='md'>
          There is no set curriculum—and that is the point.
        </Text>
        <Text lh={1.7} mb='lg'>
          We work on many different types of <NavLink to='/projects'>projects</NavLink>, from visual coding in{' '}
          <TextLink href='https://scratch.mit.edu/'>Scratch</TextLink> and <TextLink href='https://makecode.microbit.org/#editor'>Micro:Bit MakeCode</TextLink>{' '}
          to physical computing with <TextLink href='https://www.raspberrypi.com/'>Raspberry Pi</TextLink> and{' '}
          <TextLink href='https://www.arduino.cc/'>Arduino</TextLink>.
        </Text>
        <Button component={RouterLink} to='/projects' variant='filled' color='dojoTeal'>
          Browse project ideas
        </Button>
      </Paper>
    </SimpleGrid>

    <Box>
      <Group justify='space-between' align='flex-end' mb='lg'>
        <Box>
          <Text className='eyebrow'>Start here</Text>
          <Title order={2} mt='xs'>
            Everything you need for your first visit
          </Title>
        </Box>
        <Anchor component={RouterLink} to='/location' visibleFrom='sm' fw={800} c='dojoTeal.7'>
          Find us in Cambridge <FontAwesomeIcon icon={faArrowRight} />
        </Anchor>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing='md'>
        <QuickLink icon={faCode} title='Projects' to='/projects'>
          Guided ideas for different ages, interests and skill levels.
        </QuickLink>
        <QuickLink icon={faPeopleGroup} title='For ninjas' to='/ninjas'>
          What young people need to know before coming along.
        </QuickLink>
        <QuickLink icon={faUserGroup} title='For parents' to='/parents'>
          Tickets, supervision and practical information for families.
        </QuickLink>
        <QuickLink icon={faLocationDot} title='Location' to='/location'>
          Address, travel details and a map to Makespace.
        </QuickLink>
      </SimpleGrid>
    </Box>
  </Stack>
)
