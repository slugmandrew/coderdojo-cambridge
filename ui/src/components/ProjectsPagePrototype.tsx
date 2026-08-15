import { Badge, Box, Button, Divider, Grid, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { faCompass, faFilterCircleXmark, faShapes, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectGrid } from 'components/ProjectGrid'
import { PrototypeSwitcher } from 'components/PrototypeSwitcher'
import { useProjectCatalog } from 'data/ProjectCatalog'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'
import { Project } from 'types/Project'

// Three variants of the Projects page, switchable via ?variant=, on the existing /projects route.
const variants = [
  { key: 'A', name: 'Big filter buttons' },
  { key: 'B', name: 'Project picker' },
  { key: 'C', name: 'Browse and filter' },
]

const languageDescriptions: Record<LanguageName, string> = {
  [LanguageName.scratch]: 'Make games and animations',
  [LanguageName.python]: 'Write real code',
  [LanguageName.html]: 'Build web pages',
  [LanguageName.makecode]: 'Make arcade games',
  [LanguageName.hardware]: 'Build real gadgets',
  [LanguageName.unity]: 'Build in 3D',
  [LanguageName.java]: 'Create apps',
}

const levelDescriptions: Record<Level, string> = {
  [Level.intro]: 'Brand new to coding',
  [Level.one]: 'A gentle challenge',
  [Level.two]: 'Ready for more',
  [Level.three]: 'A bigger adventure',
}

const useFilters = (projects: Project[]) => {
  const [language, setLanguage] = useState<LanguageName>()
  const [level, setLevel] = useState<Level>()
  const filteredProjects = projects.filter((project) => (!language || project.language === language) && (!level || project.level.includes(level)))
  const clear = () => {
    setLanguage(undefined)
    setLevel(undefined)
  }
  return { language, setLanguage, level, setLevel, filteredProjects, clear }
}

const languageOptions = (projects: Project[]) => Object.values(LanguageName).filter((language) => projects.some((project) => project.language === language))

const Count = ({ count }: { count: number }) => (
  <Text fw={800} c='clubTeal.8' aria-live='polite'>
    {count} {count === 1 ? 'project' : 'projects'} to explore
  </Text>
)

const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant='subtle' color='gray' leftSection={<FontAwesomeIcon icon={faFilterCircleXmark} />} onClick={onClick}>
    Start again
  </Button>
)

const VariantA = ({ projects }: { projects: Project[] }) => {
  const filters = useFilters(projects)
  const languages = languageOptions(projects)

  return (
    <Stack gap='xl'>
      <Box className='projects-intro projects-intro-a'>
        <Text className='eyebrow'>Choose your own adventure</Text>
        <Title order={2}>What would you like to make?</Title>
        <Text size='lg'>Tap one or two buttons. You can change your mind whenever you like.</Text>
      </Box>

      <Paper p={{ base: 'md', sm: 'xl' }} radius='xl' className='filter-board'>
        <Stack gap='xl'>
          <Box>
            <Title order={3} mb='sm'>
              1. Pick a coding tool
            </Title>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing='sm'>
              {languages.map((language) => (
                <Button
                  key={language}
                  className='choice-tile'
                  variant={filters.language === language ? 'filled' : 'light'}
                  color={filters.language === language ? 'clubTeal' : 'gray'}
                  aria-pressed={filters.language === language}
                  onClick={() => filters.setLanguage(filters.language === language ? undefined : language)}>
                  <Stack gap={2} align='center'>
                    <Text fw={900}>{language}</Text>
                    <Text size='xs' fw={600}>
                      {languageDescriptions[language]}
                    </Text>
                  </Stack>
                </Button>
              ))}
            </SimpleGrid>
          </Box>

          <Divider />

          <Box>
            <Title order={3} mb='sm'>
              2. Pick a challenge
            </Title>
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing='sm'>
              {Object.values(Level).map((level) => (
                <Button
                  key={level}
                  className='level-choice'
                  variant={filters.level === level ? 'filled' : 'outline'}
                  color={filters.level === level ? 'clubOrange' : 'gray'}
                  aria-pressed={filters.level === level}
                  onClick={() => filters.setLevel(filters.level === level ? undefined : level)}>
                  <Stack gap={0} align='center'>
                    <Text fw={900}>{level}</Text>
                    <Text size='xs'>{levelDescriptions[level]}</Text>
                  </Stack>
                </Button>
              ))}
            </SimpleGrid>
          </Box>

          <Group justify='space-between'>
            <Count count={filters.filteredProjects.length} />
            {(filters.language || filters.level) && <ClearButton onClick={filters.clear} />}
          </Group>
        </Stack>
      </Paper>
      <ProjectGrid projects={filters.filteredProjects} />
    </Stack>
  )
}

const VariantB = ({ projects }: { projects: Project[] }) => {
  const filters = useFilters(projects)
  const languages = languageOptions(projects)
  const ready = Boolean(filters.language && filters.level)

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
              {(filters.language || filters.level) && <ClearButton onClick={filters.clear} />}
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
                  {languages.map((language) => (
                    <Button
                      key={language}
                      className='picker-language-choice'
                      justify='flex-start'
                      size='lg'
                      variant={filters.language === language ? 'filled' : 'light'}
                      color='clubTeal'
                      aria-pressed={filters.language === language}
                      onClick={() => filters.setLanguage(language)}>
                      {language} — {languageDescriptions[language]}
                    </Button>
                  ))}
                </SimpleGrid>

                {filters.language && (
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
                      {Object.values(Level).map((level) => (
                        <Button
                          key={level}
                          variant={filters.level === level ? 'filled' : 'outline'}
                          color='clubOrange'
                          aria-pressed={filters.level === level}
                          onClick={() => filters.setLevel(level)}>
                          {level}
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
            <Count count={filters.filteredProjects.length} />
          </Group>
          <ProjectGrid projects={filters.filteredProjects} />
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

const VariantC = ({ projects }: { projects: Project[] }) => {
  const filters = useFilters(projects)
  const languages = languageOptions(projects)

  return (
    <>
      <Box className='projects-intro projects-intro-c' mb='xl'>
        <Group align='flex-start' justify='space-between'>
          <Box maw={680}>
            <Text className='eyebrow'>The project shelf</Text>
            <Title order={2}>Browse, spot something fun, and start making</Title>
            <Text size='lg'>Every project is ready to open in a new tab. Use the menu if you want to narrow things down.</Text>
          </Box>
          <ThemeIcon size={72} radius='xl' color='clubTeal' variant='light' visibleFrom='sm'>
            <FontAwesomeIcon icon={faShapes} size='2x' />
          </ThemeIcon>
        </Group>
      </Box>

      <Grid gap='xl' align='flex-start'>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper className='filter-sidebar' p='lg' radius='xl'>
            <Stack gap='lg'>
              <Box>
                <Text fw={900} size='lg'>
                  Show me…
                </Text>
                <Text size='sm' c='dimmed'>
                  Choose any buttons you like.
                </Text>
              </Box>
              <Stack gap='xs'>
                <Text fw={800}>Coding tool</Text>
                {languages.map((language) => {
                  const count = projects.filter((project) => project.language === language).length
                  return (
                    <Button
                      key={language}
                      justify='space-between'
                      variant={filters.language === language ? 'filled' : 'light'}
                      color='clubTeal'
                      aria-pressed={filters.language === language}
                      onClick={() => filters.setLanguage(filters.language === language ? undefined : language)}>
                      <span>{language}</span>
                      <Badge color='clubTeal' variant='white'>
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </Stack>
              <Divider />
              <Stack gap='xs'>
                <Text fw={800}>Challenge</Text>
                {Object.values(Level).map((level) => (
                  <Button
                    key={level}
                    justify='flex-start'
                    variant={filters.level === level ? 'filled' : 'outline'}
                    color='clubOrange'
                    aria-pressed={filters.level === level}
                    onClick={() => filters.setLevel(filters.level === level ? undefined : level)}>
                    {level}
                  </Button>
                ))}
              </Stack>
              {(filters.language || filters.level) && <ClearButton onClick={filters.clear} />}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Stack gap='md'>
            <Count count={filters.filteredProjects.length} />
            <ProjectGrid projects={filters.filteredProjects} />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  )
}

export const ProjectsPagePrototype = () => {
  const { catalog, loading } = useProjectCatalog()
  const [searchParams] = useSearchParams()
  const requestedVariant = searchParams.get('variant')?.toUpperCase() ?? 'A'
  const currentVariant = variants.some((variant) => variant.key === requestedVariant) ? requestedVariant : 'A'

  if (loading) return <Loader aria-label='Loading projects' size='lg' />

  return (
    <>
      {currentVariant === 'A' && <VariantA projects={catalog.projects} />}
      {currentVariant === 'B' && <VariantB projects={catalog.projects} />}
      {currentVariant === 'C' && <VariantC projects={catalog.projects} />}
      {!import.meta.env.PROD && <PrototypeSwitcher variants={variants} current={currentVariant} />}
    </>
  )
}
