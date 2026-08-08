import { Anchor, Group, Paper, Text, Title } from '@mantine/core'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SiteLink = () => {
  const siteUrl = window.location.origin

  return (
    <Group gap='md' align='center'>
      <Title order={3} py='sm'>
        <Anchor c='clubOrange.6' href={siteUrl} style={{ fontFamily: 'Courier New, monospace' }}>
          {window.location.host}
        </Anchor>
      </Title>
      <Paper withBorder p='sm'>
        <Group gap='xs'>
          <FontAwesomeIcon icon={faMousePointer} />
          <Text>Go to this link to get here...</Text>
        </Group>
      </Paper>
    </Group>
  )
}
