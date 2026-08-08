import { Anchor, Box, Container, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { Link as RouterLink } from 'react-router'

export const Footer = () => (
  <Box component='footer' bg='gray.9' c='white' py={{ base: 48, md: 72 }}>
    <Container px={{ base: 'md', sm: 'xl' }}>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
        <Box>
          <Title order={2} size='h3' c='white'>
            Cambridge’s volunteer Code Club
          </Title>
          <Text c='gray.4' mt='sm' maw={340}>
            A free, volunteer-led coding club for young people aged 7–17 at Makespace Cambridge.
          </Text>
        </Box>
        <Stack gap='xs'>
          <Text fw={800}>Explore</Text>
          <Anchor component={RouterLink} to='/projects' c='gray.4'>
            Projects
          </Anchor>
          <Anchor component={RouterLink} to='/topics' c='gray.4'>
            Topics
          </Anchor>
          <Anchor component={RouterLink} to='/parents' c='gray.4'>
            Parent information
          </Anchor>
          <Anchor component={RouterLink} to='/location' c='gray.4'>
            Location
          </Anchor>
        </Stack>
        <Stack gap='xs'>
          <Text fw={800}>Our community</Text>
          <Anchor href='https://codeclub.org/en/clubs/gb/cambridge/cambridge-makespace' c='gray.4'>
            Code Club Cambridge @ Makespace
          </Anchor>
          <Anchor href='https://web.makespace.org' c='gray.4'>
            Makespace
          </Anchor>
          <Anchor href='https://www.raspberrypi.org/' c='gray.4'>
            Raspberry Pi
          </Anchor>
          <Anchor href='https://www.coolestprojects.org/' c='gray.4'>
            Coolest Projects
          </Anchor>
          <Anchor target='_blank' href='https://astro-pi.org/mission-zero/' c='gray.4'>
            ASTRO PI :: MISSION ZERO
          </Anchor>
        </Stack>
      </SimpleGrid>
      <Divider my='xl' color='gray.7' />
      <Group justify='space-between'>
        <Text size='sm' c='gray.5'>
          Made by volunteers in Cambridge.
        </Text>
        <Anchor component={RouterLink} to='/manage/schedule' size='xs' c='gray.6'>
          Manage calendar
        </Anchor>
      </Group>
    </Container>
  </Box>
)
