import { Anchor, Group, Paper, Text, Title } from '@mantine/core'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SiteLink = () => {
  return (
    <Group gap='md' align='center'>
      <Title order={3} py='sm'>
        <Anchor c='dojoOrange.6' href='https://coderdojo-cambridge.herokuapp.com/' style={{ fontFamily: 'Courier New, monospace' }}>
          coderdojo-cambridge.herokuapp.com
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
