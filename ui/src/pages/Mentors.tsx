import { Text, ThemeIcon } from '@mantine/core'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import React from 'react'

export const Mentors = () => (
  <>
    <PageHeading>Mentors</PageHeading>
    <Heading2>People that volunteer at the dojo</Heading2>
    <Text size='xl' fw={700} c='red.7'>
      <ThemeIcon color='red' variant='light' mr='sm'>
        <FontAwesomeIcon icon={faPersonDigging} />
      </ThemeIcon>
      UNDER CONSTRUCTION
    </Text>
  </>
)
