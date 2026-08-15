import { Badge, Box, Button, Divider, Grid, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { faCompass, faFilterCircleXmark, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectGrid } from 'components/ProjectGrid'
import { useProjectCatalog } from 'data/ProjectCatalog'
import React, { useState } from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

const languageDescriptions: Record<LanguageName, string> = {
  [LanguageName.scratch]: 'Make games and animations',
  [LanguageName.python]: 'Write real code',
  [LanguageName.html]: 'Build web pages',
  [LanguageName.makecode]: 'Make arcade games',
  [LanguageName.hardware]: 'Build real gadgets',
  [LanguageName.unity]: 'Build in 3D',
  [LanguageName.java]: 'Create apps',
}

export const ProjectPicker = () => {
  const { catalog, loading } = useProjectCatalog()
  const [language, setLanguage] = useState<LanguageName>()
  const [level, setLevel] = useState<Level>()

  const languages = Object.values(LanguageName).filter((option) => catalog.projects.some((project) => project.language === option))
  const filteredProjects = catalog.projects.filter((project) => (!language || project.language === language) && (!level || project.level.includes(level)))
  const ready = Boolean(language && level)

  const clear = () => {
    setLanguage(undefined)
    setLevel(undefined)
  }

  if (loading) return <Loader aria-label='Loading projects' size='lg' />

  return (
    <Stack gap='xl'>
      <Paper className='project-picker' p={{ base: 'lg', md: 40 }} radius='xl'>
        <Grid gap={{ base: 'xl', md: 48 }} align='center'>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap='md'>
              <ThemeIcon size={64} radius='xl' color='clubOrange' variant='filled'>
                <FontAwesomeIcon icon={faWandMagicSparkles} size='xl' />
              </ThemeIcon>
              <Text className='eyebrow'>Project picker</Text>
              <Title order={2}>Let’s find your next project</Title>
              <Text size='lg'>Answer two quick questions and we’ll show you where to start.</Text>
              {(language || level) && (
                <Button variant='subtle' color='gray' leftSection={<FontAwesomeIcon icon={faFilterCircleXmark} />} onClick={clear}>
                  Start again
                </Button>
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p={{ base: 'md', sm: 'xl' }} radius='xl' bg='white'>
              <Stack gap='lg'>
                <Box>
                  <Badge size='lg' circle color='clubTeal' mr='xs'>
                    1
                  </Badge>
                  <Text component='span' fw={900} size='lg'>
                    What sounds fun?
                  </Text>
                </Box>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
                  {languages.map((option) => (
                    <Button
                      key={option}
                      className='picker-language-choice'
                      justify='flex-start'
                      size='lg'
                      variant={language === option ? 'filled' : 'light'}
                      color='clubTeal'
                      aria-pressed={language === option}
                      onClick={() => setLanguage(option)}>
                      {option} — {languageDescriptions[option]}
                    </Button>
                  ))}
                </SimpleGrid>

                {language && (
                  <Box className='picker-step-two'>
                    <Divider my='lg' />
                    <Box mb='md'>
                      <Badge size='lg' circle color='clubOrange' mr='xs'>
                        2
                      </Badge>
                      <Text component='span' fw={900} size='lg'>
                        How tricky should it be?
                      </Text>
                    </Box>
                    <Group gap='sm'>
                      {Object.values(Level).map((option) => (
                        <Button
                          key={option}
                          variant={level === option ? 'filled' : 'outline'}
                          color='clubOrange'
                          aria-pressed={level === option}
                          onClick={() => setLevel(option)}>
                          {option}
                        </Button>
                      ))}
                    </Group>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>

      {ready ? (
        <Stack gap='md'>
          <Group justify='space-between'>
            <Title order={2}>These could be perfect!</Title>
            <Text fw={800} c='clubTeal.8' aria-live='polite'>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} to explore
            </Text>
          </Group>
          <ProjectGrid projects={filteredProjects} />
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
