import { Alert, Button, Group, Loader, MultiSelect, Paper, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faFolderPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMentor } from 'auth/MentorContext'
import { useProjectCatalog } from 'data/ProjectCatalog'
import React, { FormEvent, useState } from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

export const ManageProjects = () => {
  const auth = useMentor()
  const { catalog, refresh } = useProjectCatalog()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [language, setLanguage] = useState<string | null>(null)
  const [levels, setLevels] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ color: string; text: string } | null>(null)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, language, level: levels, ...(imageUrl ? { imageUrl } : {}) }),
      })
      const body = (await response.json()) as { title?: string; message?: string }
      if (!response.ok) throw new Error(body.message || 'The project could not be published.')
      setMessage({ color: 'green', text: `${body.title || title} is now live in the project catalogue.` })
      setTitle('')
      setUrl('')
      setImageUrl('')
      setLanguage(null)
      setLevels([])
      await refresh()
    } catch (error: unknown) {
      setMessage({ color: 'red', text: error instanceof Error ? error.message : 'The project could not be published.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack gap='xl' maw={760} mx='auto'>
      <div>
        <Text className='eyebrow'>Mentor tools</Text>
        <Title order={1} mt='xs'>
          Add a project
        </Title>
        <Text c='dimmed' mt='sm'>
          Recommend a learning activity to every coder. New projects appear immediately in the main catalogue.
        </Text>
      </div>

      {message && <Alert color={message.color}>{message.text}</Alert>}

      {auth.loading && (
        <Group>
          <Loader size='sm' />
          <Text>Checking mentor access…</Text>
        </Group>
      )}

      {!auth.loading && !auth.authenticated && (
        <Alert color={auth.configured ? 'clubTeal' : 'red'} title={auth.configured ? 'Mentor sign-in required' : 'Mentor sign-in is not configured'}>
          <Text mb='md'>Sign in with an approved mentor Google account to publish a project.</Text>
          {auth.configured && (
            <Button component='a' href='/auth/google?returnTo=/manage/projects' leftSection={<FontAwesomeIcon icon={faGoogle} />}>
              Sign in with Google
            </Button>
          )}
        </Alert>
      )}

      {auth.authenticated && (
        <>
          <Group justify='space-between'>
            <Text size='sm'>Signed in as {auth.mentor?.name || auth.mentor?.email}</Text>
            <Button variant='subtle' color='gray' leftSection={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={() => void auth.signOut()}>
              Sign out
            </Button>
          </Group>

          <Paper component='form' onSubmit={(event) => void submit(event)} p={{ base: 'md', sm: 'xl' }} radius='xl' withBorder>
            <Stack gap='md'>
              <TextInput label='Project title' required value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
              <TextInput label='Project link' type='url' required placeholder='https://…' value={url} onChange={(event) => setUrl(event.currentTarget.value)} />
              <TextInput
                label='Image link (optional)'
                description='Leave blank to use the Code Club project placeholder.'
                type='url'
                placeholder='https://…'
                value={imageUrl}
                onChange={(event) => setImageUrl(event.currentTarget.value)}
              />
              <Select
                label='Language'
                required
                data={Object.values(LanguageName).filter((value) => !value.includes('coming soon'))}
                value={language}
                onChange={setLanguage}
              />
              <MultiSelect label='Levels' required data={Object.values(Level)} value={levels} onChange={setLevels} />
              <Group justify='space-between' mt='sm'>
                <Button component='a' href='/manage/schedule' variant='subtle' leftSection={<FontAwesomeIcon icon={faArrowLeft} />}>
                  Calendar
                </Button>
                <Button
                  type='submit'
                  color='clubOrange'
                  loading={saving}
                  disabled={!title || !url || !language || levels.length === 0}
                  leftSection={<FontAwesomeIcon icon={faFolderPlus} />}>
                  Publish project
                </Button>
              </Group>
            </Stack>
          </Paper>

          <Text size='sm' c='dimmed'>
            {catalog.projects.length} projects are currently published.
          </Text>
        </>
      )}
    </Stack>
  )
}
