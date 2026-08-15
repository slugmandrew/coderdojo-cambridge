import { Badge, Box, Button, Collapse, Divider, Grid, Group, Image, Paper, Stack, Text, Title } from '@mantine/core'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { TopicDefinition } from 'data/ProjectDiscovery'

export const TopicGuideCard = ({ topic }: { topic: TopicDefinition }) => {
  const [opened, setOpened] = useState(false)
  const Guide = topic.Guide

  return (
    <Paper className='topic-guide-card' radius='xl' p={{ base: 'md', sm: 'xl' }}>
      <Grid gap='xl' align='center'>
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Image src={topic.image} alt='' h={220} fit='cover' radius='lg' />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Stack gap='sm'>
            <Text className='eyebrow'>Topic guide</Text>
            <Title order={2}>{topic.title}</Title>
            <Text size='lg'>{topic.summary}</Text>
            <Group gap='xs'>
              <Badge size='lg' color='clubTeal' variant='light'>
                {topic.ages}
              </Badge>
              <Badge size='lg' color='clubOrange' variant='light'>
                {topic.equipment}
              </Badge>
            </Group>
            <Button
              variant='subtle'
              color='clubTeal'
              w='fit-content'
              rightSection={<FontAwesomeIcon icon={opened ? faChevronUp : faChevronDown} />}
              aria-expanded={opened}
              onClick={() => setOpened((current) => !current)}>
              {opened ? 'Hide the topic guide' : 'Read the topic guide'}
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
      <Collapse expanded={opened}>
        <Divider my='xl' />
        <Box className='topic-guide-details'>
          <Guide />
        </Box>
      </Collapse>
    </Paper>
  )
}
