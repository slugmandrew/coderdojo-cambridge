import { Alert, Anchor, Badge, Box, Button, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { faArrowRight, faCalendarDay, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultSchedule, DojoSession, Schedule } from 'data/Schedule'
import React, { useEffect, useState } from 'react'

const dateFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })

const sessionDate = (session: DojoSession) => new Date(`${session.date}T12:00:00Z`)

export const ScheduleCalendar = () => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    void fetch('/api/schedule', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Schedule could not be loaded')
        return response.json() as Promise<Schedule>
      })
      .then(setSchedule)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setOffline(true)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming = schedule.sessions
    .filter((session) => sessionDate(session).getTime() >= today.getTime())
    .sort((left, right) => left.date.localeCompare(right.date))
  const visibleSessions = upcoming.length > 0 ? upcoming : [...schedule.sessions].sort((left, right) => left.date.localeCompare(right.date))

  return (
    <Paper id='calendar' p={{ base: 'lg', sm: 'xl' }} radius='xl' bg='dojoTeal.9' c='white' shadow='lg'>
      <Group justify='space-between' align='flex-start' mb='xl'>
        <Box>
          <Text tt='uppercase' fw={800} size='xs' c='dojoTeal.1' lts={1.4} mb={6}>
            Plan your visit
          </Text>
          <Title order={2} c='white'>
            Dojo calendar
          </Title>
          <Text c='dojoTeal.1' mt={6}>
            Monthly Saturdays at Makespace Cambridge
          </Text>
        </Box>
        <ThemeIcon size={48} radius='xl' variant='light' color='dojoTeal'>
          <FontAwesomeIcon icon={faCalendarDay} />
        </ThemeIcon>
      </Group>

      {loading && (
        <Group mb='md'>
          <Loader size='sm' color='white' />
          <Text size='sm'>Checking the latest dates…</Text>
        </Group>
      )}
      {offline && <Alert mb='md' color='yellow' variant='light' title='Showing the published schedule' />}

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
        {visibleSessions.map((session, index) => {
          const date = sessionDate(session)
          const bookingUrl = session.bookingUrl || 'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'

          return (
            <Paper key={session.id} p='md' radius='lg' bg='rgba(255, 255, 255, 0.09)' style={{ borderColor: 'rgba(255, 255, 255, 0.14)' }}>
              <Group wrap='nowrap' align='flex-start'>
                <Stack gap={0} align='center' w={52} style={{ flexShrink: 0 }}>
                  <Text size='xs' fw={800} c='dojoOrange.3' tt='uppercase'>
                    {monthFormatter.format(date)}
                  </Text>
                  <Text size='xl' fw={900} lh={1.1}>
                    {date.getUTCDate()}
                  </Text>
                </Stack>
                <Box style={{ flex: 1 }}>
                  <Group gap='xs'>
                    <Text fw={800}>{session.title}</Text>
                    {index === 0 && upcoming.length > 0 && <Badge color='dojoOrange'>Next</Badge>}
                    {session.cancelled && <Badge color='red'>Cancelled</Badge>}
                  </Group>
                  <Text size='sm' c='dojoTeal.1'>
                    {dateFormatter.format(date)} · {session.time}
                  </Text>
                  {session.note && (
                    <Text size='sm' mt={4}>
                      {session.note}
                    </Text>
                  )}
                  {!session.cancelled && (
                    <Anchor href={bookingUrl} target='_blank' c='dojoOrange.2' size='sm' fw={800} mt={6} inline>
                      Book a place <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>
                  )}
                </Box>
              </Group>
            </Paper>
          )
        })}
      </SimpleGrid>

      <Group justify='space-between' align='center' mt='lg'>
        <Text size='sm' c='dojoTeal.1'>
          Tickets are required for every ninja. Parents do not need a ticket.
        </Text>
        <Button
          component='a'
          href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'
          target='_blank'
          color='dojoOrange'
          leftSection={<FontAwesomeIcon icon={faTicket} />}>
          Get tickets
        </Button>
      </Group>
    </Paper>
  )
}
