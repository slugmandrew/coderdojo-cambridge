import { Badge, Box, Button, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title, UnstyledButton } from '@mantine/core'
import { faCode, faCompass, faFilterCircleXmark, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectGrid } from 'components/ProjectGrid'
import { TopicGuideCard } from 'components/TopicGuideCard'
import { BrowseMode, createProjectDiscovery, isBrowseMode, isLanguageName, isLevel, isTopicSlug, topicDefinitions } from 'data/ProjectDiscovery'
import { useProjectCatalog } from 'data/ProjectCatalog'
import React from 'react'
import { useSearchParams } from 'react-router'
import { Level } from 'types/Level'

export const ProjectPicker = () => {
  const { catalog, loading } = useProjectCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const discovery = createProjectDiscovery(catalog.projects)
  const browseParam = searchParams.get('browse')
  const topicParam = searchParams.get('topic')
  const languageParam = searchParams.get('language')
  const levelParam = searchParams.get('level')
  const mode = isBrowseMode(browseParam) ? browseParam : undefined
  const topic = isTopicSlug(topicParam) ? topicParam : undefined
  const language = isLanguageName(languageParam) ? languageParam : undefined
  const level = isLevel(levelParam) ? levelParam : undefined
  const selectedTopic = topicDefinitions.find((candidate) => candidate.slug === topic)
  const hasPrimaryChoice = Boolean(topic || language)
  const filteredProjects = discovery.find({ topic, language, level })

  const updateSearch = (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  const chooseMode = (nextMode: BrowseMode) => updateSearch({ browse: nextMode, topic: undefined, language: undefined, level: undefined })
  const clear = () => setSearchParams({}, { replace: true })

  if (loading) return <Loader aria-label='Loading projects' size='lg' />

  return (
    <Stack gap='xl'>
      <Paper className='project-picker' p={{ base: 'lg', md: 40 }} radius='xl'>
        <Stack gap='xl'>
          <Box maw={720}>
            <Text className='eyebrow'>Project picker</Text>
            <Title order={2}>What would you like to explore?</Title>
            <Text size='lg' mt='sm'>
              Start with an idea or a coding tool. You can mix and match your choices afterwards.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
            <UnstyledButton className='discovery-route' data-active={mode === 'topics' || undefined} onClick={() => chooseMode('topics')}>
              <Group wrap='nowrap' align='flex-start'>
                <ThemeIcon size={52} radius='xl' color='clubOrange' variant={mode === 'topics' ? 'filled' : 'light'}>
                  <FontAwesomeIcon icon={faLightbulb} size='lg' />
                </ThemeIcon>
                <Box>
                  <Text fw={900} size='lg'>
                    What do you want to make?
                  </Text>
                  <Text size='sm'>Choose a game, story, website, gadget, or something completely different.</Text>
                </Box>
              </Group>
            </UnstyledButton>
            <UnstyledButton className='discovery-route' data-active={mode === 'languages' || undefined} onClick={() => chooseMode('languages')}>
              <Group wrap='nowrap' align='flex-start'>
                <ThemeIcon size={52} radius='xl' color='clubTeal' variant={mode === 'languages' ? 'filled' : 'light'}>
                  <FontAwesomeIcon icon={faCode} size='lg' />
                </ThemeIcon>
                <Box>
                  <Text fw={900} size='lg'>
                    What do you want to code with?
                  </Text>
                  <Text size='sm'>Pick Scratch, HTML, Python, or Unity and find something made for it.</Text>
                </Box>
              </Group>
            </UnstyledButton>
          </SimpleGrid>

          {mode === 'topics' && (
            <Box className='picker-step-two'>
              <Title order={3} mb='md'>
                Pick something that sounds fun
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='sm'>
                {discovery.topics.map((option) => (
                  <Button
                    key={option.slug}
                    className='topic-choice'
                    variant={topic === option.slug ? 'filled' : 'light'}
                    color='clubOrange'
                    aria-pressed={topic === option.slug}
                    leftSection={<FontAwesomeIcon icon={option.icon} />}
                    onClick={() => updateSearch({ topic: option.slug, language: undefined, level: undefined })}>
                    <Stack gap={4} w='100%'>
                      <Text component='span' fw={900}>
                        {option.prompt}
                      </Text>
                      <Text component='span' size='xs' fw={600}>
                        {option.summary}
                      </Text>
                    </Stack>
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {mode === 'languages' && (
            <Box className='picker-step-two'>
              <Title order={3} mb='md'>
                Pick a coding tool
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
                {discovery.languages.map((option) => (
                  <Button
                    key={option.value}
                    className='picker-language-choice'
                    justify='flex-start'
                    size='lg'
                    variant={language === option.value ? 'filled' : 'light'}
                    color='clubTeal'
                    aria-pressed={language === option.value}
                    onClick={() => updateSearch({ language: option.value, topic: undefined, level: undefined })}>
                    <Stack gap={4} w='100%'>
                      <Group justify='space-between' gap='xs'>
                        <Text component='span' fw={900}>
                          {option.value}
                        </Text>
                        <Badge color='clubTeal' variant={language === option.value ? 'white' : 'light'}>
                          {option.ages}
                        </Badge>
                      </Group>
                      <Text component='span' size='sm' fw={600}>
                        {option.description}
                      </Text>
                    </Stack>
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {(mode || hasPrimaryChoice) && (
            <Group justify='flex-end'>
              <Button variant='subtle' color='gray' leftSection={<FontAwesomeIcon icon={faFilterCircleXmark} />} onClick={clear}>
                Start again
              </Button>
            </Group>
          )}
        </Stack>
      </Paper>

      {selectedTopic && <TopicGuideCard topic={selectedTopic} />}

      {hasPrimaryChoice && (
        <Paper p={{ base: 'md', sm: 'xl' }} radius='xl'>
          <Stack gap='lg'>
            <Box>
              <Text className='eyebrow'>Optional filters</Text>
              <Title order={3} mt={4}>
                Narrow it down
              </Title>
            </Box>

            <Box>
              <Text fw={800} mb='xs'>
                Challenge
              </Text>
              <Group gap='xs'>
                {Object.values(Level).map((option) => (
                  <Button
                    key={option}
                    variant={level === option ? 'filled' : 'outline'}
                    color='clubOrange'
                    aria-pressed={level === option}
                    onClick={() => updateSearch({ level: level === option ? undefined : option })}>
                    {option}
                  </Button>
                ))}
              </Group>
            </Box>

            {mode === 'topics' && (
              <Box>
                <Text fw={800} mb='xs'>
                  Coding tool
                </Text>
                <Group gap='xs'>
                  {[...new Set(discovery.find({ topic }).map((project) => project.language))].map((option) => (
                    <Button
                      key={option}
                      variant={language === option ? 'filled' : 'outline'}
                      color='clubTeal'
                      aria-pressed={language === option}
                      onClick={() => updateSearch({ language: language === option ? undefined : option })}>
                      {option}
                    </Button>
                  ))}
                </Group>
              </Box>
            )}

            {mode === 'languages' && (
              <Box>
                <Text fw={800} mb='xs'>
                  What do you want to make?
                </Text>
                <Group gap='xs'>
                  {discovery.topics
                    .filter((option) => discovery.find({ topic: option.slug, language }).length > 0)
                    .map((option) => (
                      <Button
                        key={option.slug}
                        variant={topic === option.slug ? 'filled' : 'outline'}
                        color='clubOrange'
                        aria-pressed={topic === option.slug}
                        onClick={() => updateSearch({ topic: topic === option.slug ? undefined : option.slug })}>
                        {option.title}
                      </Button>
                    ))}
                </Group>
              </Box>
            )}
          </Stack>
        </Paper>
      )}

      {hasPrimaryChoice ? (
        <Stack gap='md'>
          <Group justify='space-between' align='flex-end'>
            <Title order={2}>These could be perfect!</Title>
            <Text fw={800} c='clubTeal.8' aria-live='polite'>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} to explore
            </Text>
          </Group>
          {filteredProjects.length > 0 ? (
            <ProjectGrid projects={filteredProjects} />
          ) : (
            <Paper p='xl' radius='xl' ta='center' bg='clubOrange.0'>
              <Text fw={800}>No projects match every choice yet. Try removing one of the optional filters.</Text>
            </Paper>
          )}
        </Stack>
      ) : (
        <Paper p='xl' radius='xl' ta='center' bg='clubTeal.0'>
          <FontAwesomeIcon icon={faCompass} size='2x' color='#006b5d' />
          <Text mt='sm' fw={800}>
            Your project matches will appear here.
          </Text>
        </Paper>
      )}
    </Stack>
  )
}
