import { Anchor, Group, Text } from '@mantine/core'
import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SiteLink = () => (
  <Group position='center' spacing='sm'>
    <Text fw={700}>Visit <Anchor href='https://coderdojo-cambridge.herokuapp.com/' target='_blank'>coderdojo-cambridge.herokuapp.com</Anchor></Text>
    <Text size='sm' c='dimmed'><FontAwesomeIcon icon={faMousePointer} /> Open this link to access the site</Text>
  </Group>
)
