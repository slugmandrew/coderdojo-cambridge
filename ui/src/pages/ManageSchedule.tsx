import { Alert, Box, Button, Checkbox, Group, LoadingOverlay, Paper, PasswordInput, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { faCalendarPlus, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultSchedule, DojoSession, Schedule } from 'data/Schedule'
import React, { useEffect, useState } from 'react'

const blankSession = (): DojoSession => ({ id: `session-${Date.now()}`, date: '', title: 'CoderDojo session', time: '10:00–13:00' })

export const ManageSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule)
  const [token, setToken] = useState(() => sessionStorage.getItem('scheduleEditorToken') || '')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ color: string; text: string } | null>(null)

  useEffect(() => {
    void fetch('/api/schedule')
      .then((response) => response.json() as Promise<Schedule>)
      .then(setSchedule)
      .catch(() => setMessage({ color: 'red', text: 'The current schedule could not be loaded.' }))
      .finally(() => setLoading(false))
  }, [])

  const update = (index: number, patch: Partial<DojoSession>) =>
    setSchedule((current) => ({
      ...current,
      sessions: current.sessions.map((session, sessionIndex) => (sessionIndex === index ? { ...session, ...patch } : session)),
    }))

  const save = async () => {
    setSaving(true)
    setMessage(null)
    sessionStorage.setItem('scheduleEditorToken', token)
    try {
      const response = await fetch('/api/schedule', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessions: schedule.sessions }),
      })
      const body = (await response.json()) as Schedule | { message?: string }
      if (!response.ok) throw new Error('message' in body && body.message ? body.message : 'The schedule could not be saved.')
      setSchedule(body as Schedule)
      setMessage({ color: 'green', text: 'The new schedule is live.' })
    } catch (error: unknown) {
      setMessage({ color: 'red', text: error instanceof Error ? error.message : 'The schedule could not be saved.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack gap='xl' maw={900} mx='auto'>
      <Box>
        <Text className='eyebrow'>Mini CMS</Text>
        <Title order={1} mt='xs'>
          Manage the dojo calendar
        </Title>
        <Text c='dimmed' mt='sm' maw={660}>
          Add, change or cancel a session here. Saving publishes the calendar immediately—there is no code change or deployment.
        </Text>
      </Box>

      {message && <Alert color={message.color}>{message.text}</Alert>}

      <Paper p={{ base: 'md', sm: 'xl' }} radius='xl' pos='relative'>
        <LoadingOverlay visible={loading} />
        <Stack gap='lg'>
          {schedule.sessions.map((session, index) => (
            <Paper key={session.id} p='md' radius='lg' bg='gray.0' shadow='none'>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label='Session name' required value={session.title} onChange={(event) => update(index, { title: event.currentTarget.value })} />
                <TextInput label='Date' type='date' required value={session.date} onChange={(event) => update(index, { date: event.currentTarget.value })} />
                <TextInput label='Time' required value={session.time} onChange={(event) => update(index, { time: event.currentTarget.value })} />
                <TextInput
                  label='Booking link (optional)'
                  type='url'
                  value={session.bookingUrl || ''}
                  onChange={(event) => update(index, { bookingUrl: event.currentTarget.value || undefined })}
                />
              </SimpleGrid>
              <TextInput
                mt='sm'
                label='Note (optional)'
                value={session.note || ''}
                onChange={(event) => update(index, { note: event.currentTarget.value || undefined })}
              />
              <Group mt='md' justify='space-between'>
                <Checkbox
                  label='Session cancelled'
                  checked={session.cancelled || false}
                  onChange={(event) => update(index, { cancelled: event.currentTarget.checked })}
                />
                <Group gap='xs'>
                  <Button
                    aria-label={`Delete ${session.title}`}
                    variant='subtle'
                    color='red'
                    px='sm'
                    onClick={() =>
                      window.confirm(`Delete ${session.title}?`) &&
                      setSchedule((current) => ({ ...current, sessions: current.sessions.filter((_, itemIndex) => itemIndex !== index) }))
                    }>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Group>
              </Group>
            </Paper>
          ))}

          <Button
            variant='light'
            color='dojoTeal'
            leftSection={<FontAwesomeIcon icon={faCalendarPlus} />}
            onClick={() => setSchedule((current) => ({ ...current, sessions: [...current.sessions, blankSession()] }))}>
            Add a session
          </Button>
        </Stack>
      </Paper>

      <Paper p={{ base: 'md', sm: 'xl' }} radius='xl' bg='dojoTeal.0'>
        <Title order={2} size='h3' mb='sm'>
          Publish changes
        </Title>
        <Text size='sm' c='dimmed' mb='md'>
          The editor key is kept only in this browser tab.
        </Text>
        <Group align='flex-end'>
          <PasswordInput
            label='Editor key'
            placeholder='Enter the schedule editor key'
            value={token}
            onChange={(event) => setToken(event.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button color='dojoOrange' loading={saving} disabled={!token} leftSection={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={() => void save()}>
            Save and publish
          </Button>
        </Group>
        {schedule.updatedAt && (
          <Text size='xs' c='dimmed' mt='md'>
            Last published {new Date(schedule.updatedAt).toLocaleString('en-GB')}
          </Text>
        )}
      </Paper>
    </Stack>
  )
}
