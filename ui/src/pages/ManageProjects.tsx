import { Alert, Button, Group, Loader, MultiSelect, Paper, Select, Stack, Text, TextInput, Title } from '@mantine/core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faFloppyDisk, faFolderPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createCroppedProjectImage } from 'components/ProjectImageCrop'
import { ProjectImageEditor } from 'components/ProjectImageEditor'
import { useMentor } from 'auth/MentorContext'
import { useProjectCatalog } from 'data/ProjectCatalog'
import { topicDefinitions } from 'data/ProjectDiscovery'
import React, { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'

const editableCollections = new Set(topicDefinitions.map((topic) => topic.collection))

const ProjectForm = ({ project, refresh }: { project?: Project; refresh: () => Promise<void> }) => {
  const savedImageZoom = project?.imageZoom ?? 1
  const savedImagePositionX = project?.imagePositionX ?? 50
  const savedImagePositionY = project?.imagePositionY ?? 50
  const [title, setTitle] = useState(project?.title ?? '')
  const [url, setUrl] = useState(project?.url ?? '')
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageZoom, setImageZoom] = useState(savedImageZoom)
  const [imagePositionX, setImagePositionX] = useState(savedImagePositionX)
  const [imagePositionY, setImagePositionY] = useState(savedImagePositionY)
  const [language, setLanguage] = useState<string | null>(project?.language ?? null)
  const [levels, setLevels] = useState<string[]>(project?.level ?? [])
  const [collections, setCollections] = useState<string[]>(project?.collections?.filter((collection) => editableCollections.has(collection)) ?? [])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ color: string; text: string } | null>(null)

  const uploadCroppedImage = async () => {
    if (!imageFile) return imageUrl.trim() || undefined
    const croppedImage = await createCroppedProjectImage(imageFile, imageZoom, imagePositionX, imagePositionY)
    const response = await fetch('/api/project-images', { method: 'POST', headers: { 'Content-Type': croppedImage.type }, body: croppedImage })
    const body = (await response.json()) as { imageUrl?: string; message?: string }
    if (!response.ok || !body.imageUrl) throw new Error(body.message || 'The picture could not be uploaded.')
    return body.imageUrl
  }

  const resetForm = () => {
    setTitle('')
    setUrl('')
    setImageUrl('')
    setImageFile(null)
    setImageZoom(1)
    setImagePositionX(50)
    setImagePositionY(50)
    setLanguage(null)
    setLevels([])
    setCollections([])
  }

  const changeImageFile = (file: File | null) => {
    setImageFile(file)
    setImageZoom(file ? 1 : savedImageZoom)
    setImagePositionX(file ? 50 : savedImagePositionX)
    setImagePositionY(file ? 50 : savedImagePositionY)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const submittedImageUrl = await uploadCroppedImage()
      const savedCrop = imageFile ? { imageZoom: 1, imagePositionX: 50, imagePositionY: 50 } : { imageZoom, imagePositionX, imagePositionY }
      const response = await fetch(project ? `/api/projects/${encodeURIComponent(project.slug)}` : '/api/projects', {
        method: project ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          url,
          language,
          level: levels,
          collections,
          ...savedCrop,
          ...(submittedImageUrl ? { imageUrl: submittedImageUrl } : {}),
        }),
      })
      const body = (await response.json()) as { title?: string; message?: string }
      if (!response.ok) throw new Error(body.message || `The project could not be ${project ? 'updated' : 'published'}.`)
      setMessage({
        color: 'green',
        text: project ? `${body.title || title} has been updated.` : `${body.title || title} is now live in the project catalogue.`,
      })
      if (!project) resetForm()
      else {
        setImageUrl(submittedImageUrl ?? '')
        setImageFile(null)
        if (imageFile) {
          setImageZoom(1)
          setImagePositionX(50)
          setImagePositionY(50)
        }
      }
      await refresh()
    } catch (error: unknown) {
      setMessage({ color: 'red', text: error instanceof Error ? error.message : `The project could not be ${project ? 'updated' : 'published'}.` })
    } finally {
      setSaving(false)
    }
  }

  const imagePreview = imageUrl || (project ? `/screenshot/${project.slug}.png` : '/project-placeholder.svg')

  return (
    <>
      {message && <Alert color={message.color}>{message.text}</Alert>}
      <Paper component='form' onSubmit={(event) => void submit(event)} p={{ base: 'md', sm: 'xl' }} radius='xl' withBorder>
        <Stack gap='md'>
          <TextInput label='Project title' required value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
          <TextInput label='Project link' type='url' required placeholder='https://…' value={url} onChange={(event) => setUrl(event.currentTarget.value)} />
          <ProjectImageEditor
            file={imageFile}
            fallbackSrc={imagePreview}
            zoom={imageZoom}
            positionX={imagePositionX}
            positionY={imagePositionY}
            onFileChange={changeImageFile}
            onZoomChange={setImageZoom}
            onPositionXChange={setImagePositionX}
            onPositionYChange={setImagePositionY}
          />
          <TextInput
            label='Or use an image link (optional)'
            description='A picture chosen above takes priority. Leave both blank to use the Code Club project image.'
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
          <MultiSelect
            label='Interests'
            required
            description='Choose everything this project helps a coder make or explore.'
            data={topicDefinitions.map((topic) => ({ value: topic.collection, label: topic.title }))}
            value={collections}
            onChange={setCollections}
          />
          <Group justify='space-between' mt='sm'>
            <Button component='a' href={project ? '/projects' : '/manage/schedule'} variant='subtle' leftSection={<FontAwesomeIcon icon={faArrowLeft} />}>
              {project ? 'Cancel editing' : 'Calendar'}
            </Button>
            <Button
              type='submit'
              color='clubOrange'
              loading={saving}
              disabled={!title || !url || !language || levels.length === 0 || collections.length === 0}
              leftSection={<FontAwesomeIcon icon={project ? faFloppyDisk : faFolderPlus} />}>
              {project ? 'Save changes' : 'Publish project'}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </>
  )
}

export const ManageProjects = () => {
  const auth = useMentor()
  const { catalog, loading: catalogLoading, refresh } = useProjectCatalog()
  const [searchParams] = useSearchParams()
  const editSlug = searchParams.get('edit')
  const editingProject = editSlug ? catalog.projects.find((project) => project.slug === editSlug) : undefined
  const editMissing = Boolean(editSlug && !catalogLoading && !editingProject)

  return (
    <Stack gap='xl' maw={760} mx='auto'>
      <div>
        <Text className='eyebrow'>Mentor tools</Text>
        <Title order={1} mt='xs'>
          {editSlug ? 'Edit project' : 'Add a project'}
        </Title>
        <Text c='dimmed' mt='sm'>
          {editSlug
            ? 'Update this learning activity. Saved changes appear immediately in the main catalogue.'
            : 'Recommend a learning activity to every coder. New projects appear immediately in the main catalogue.'}
        </Text>
      </div>

      {auth.loading && (
        <Group>
          <Loader size='sm' />
          <Text>Checking mentor access…</Text>
        </Group>
      )}

      {!auth.loading && !auth.authenticated && (
        <Alert color={auth.configured ? 'clubTeal' : 'red'} title={auth.configured ? 'Mentor sign-in required' : 'Mentor sign-in is not configured'}>
          <Text mb='md'>Sign in with an approved mentor Google account to publish project changes.</Text>
          {auth.configured && (
            <Button
              component='a'
              href={`/auth/google?returnTo=${encodeURIComponent(editSlug ? `/manage/projects?edit=${editSlug}` : '/manage/projects')}`}
              leftSection={<FontAwesomeIcon icon={faGoogle} />}>
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

          {editMissing && <Alert color='red'>That project could not be found. Return to the catalogue and choose another project.</Alert>}
          {editSlug && catalogLoading && (
            <Group>
              <Loader size='sm' />
              <Text>Loading project…</Text>
            </Group>
          )}
          {!editMissing && (!editSlug || editingProject) && (
            <ProjectForm key={editingProject?.slug ?? 'new-project'} project={editingProject} refresh={refresh} />
          )}

          <Text size='sm' c='dimmed'>
            {catalog.projects.length} projects are currently published.
          </Text>
        </>
      )}
    </Stack>
  )
}
