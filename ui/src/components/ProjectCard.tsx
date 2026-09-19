import { ActionIcon, Badge, Box, Button, Group, Image, Paper, Stack, Title, Tooltip } from '@mantine/core'
import { faPython, faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faMicrochip, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMentor } from 'auth/MentorContext'
import { LanguageTag } from 'components/LanguageTag'
import { LevelTag } from 'components/LevelTag'
import { topicDefinitions } from 'data/ProjectDiscovery'
import React, { FC } from 'react'
import { Link } from 'react-router'
import { Project } from 'types/Project'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug, domain = 'raspberrypi.org', imageUrl, collections = [] }) => {
  const auth = useMentor()
  const interests = topicDefinitions.filter((interest) => collections.includes(interest.collection))

  return (
    <Paper withBorder shadow='xs' radius='md' style={(theme) => ({ height: '100%', backgroundColor: theme.white, position: 'relative' })}>
      {auth.authenticated && (
        <Tooltip label={`Edit ${title}`}>
          <ActionIcon
            component={Link}
            to={`/manage/projects?edit=${encodeURIComponent(slug)}`}
            aria-label={`Edit ${title}`}
            color='clubOrange'
            size='lg'
            radius='xl'
            variant='filled'
            style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.24)' }}>
            <FontAwesomeIcon icon={faPencil} />
          </ActionIcon>
        </Tooltip>
      )}
      <Box style={{ overflow: 'hidden' }}>
        <Image src={imageUrl || `/screenshot/${slug}.png`} fallbackSrc='/project-placeholder.svg' alt={title} height={180} fit='cover' />
      </Box>
      <Stack p='md' gap='md'>
        <Title order={3} c='clubTeal.7'>
          {title}
        </Title>
        <Group gap='xs' align='flex-start'>
          <LanguageTag language={language} />
          <LevelTag levels={level} />
          {interests.map((interest) => (
            <Badge key={interest.slug} size='lg' color='clubOrange' variant='light' leftSection={<FontAwesomeIcon icon={interest.icon} />}>
              {interest.label}
            </Badge>
          ))}
        </Group>
        <Group justify='flex-end'>
          <Button
            color='blue'
            size='md'
            onClick={() => window.open(url, '_blank')}
            leftSection={<FontAwesomeIcon icon={domain === 'raspberrypi.org' ? faRaspberryPi : domain === 'microbit.org' ? faMicrochip : faPython} />}
            rightSection={<FontAwesomeIcon icon={faArrowRight} />}>
            View on {domain}
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
