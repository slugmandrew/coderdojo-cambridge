import { Button, Card, Group, Image, Stack, Title } from '@mantine/core'
import { faPython, faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LanguageTag } from 'components/LanguageTag'
import { LevelTag } from 'components/LevelTag'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug, domain = 'raspberrypi.org' }) => {
  const icon = domain === 'raspberrypi.org' ? faRaspberryPi : domain === 'microbit.org' ? faMicrochip : faPython

  return (
    <Card withBorder radius='md' h='100%'>
      <Card.Section>
        <Image src={`./screenshot/${slug}.png`} h={150} fit='cover' />
      </Card.Section>
      <Stack spacing='sm' mt='sm'>
        <Title order={4} c='teal.7'>{title}</Title>
        <Group spacing='xs'>
          <LanguageTag language={language} />
          <LevelTag levels={level} />
        </Group>
        <Button
          mt='auto'
          onClick={() => window.open(url, '_blank')}
          leftIcon={<FontAwesomeIcon icon={icon} />}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          variant='light'
        >
          View on {domain}
        </Button>
      </Stack>
    </Card>
  )
}

