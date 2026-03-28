import { Box, Button, Group, Image, Paper, Stack, Title } from '@mantine/core'
import { faPython, faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LanguageTag } from 'components/LanguageTag'
import { LevelTag } from 'components/LevelTag'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug, domain = 'raspberrypi.org' }) => {
  return (
    <Paper withBorder shadow='xs' radius='md' sx={(theme) => ({ height: '100%', backgroundColor: theme.white })}>
      <Box sx={{ overflow: 'hidden' }}>
        <Image src={`./screenshot/${slug}.png`} alt={title} height={180} fit='cover' />
      </Box>
      <Stack p='md' spacing='md'>
        <Title order={3} color='dojoTeal.7'>
          {title}
        </Title>
        <Group spacing='xs' align='flex-start'>
          <LanguageTag language={language} />
          <LevelTag levels={level} />
        </Group>
        <Group position='right'>
          <Button
            color='blue'
            size='md'
            onClick={() => window.open(url, '_blank')}
            leftIcon={<FontAwesomeIcon icon={domain === 'raspberrypi.org' ? faRaspberryPi : domain === 'microbit.org' ? faMicrochip : faPython} />}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
            View on {domain}
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
