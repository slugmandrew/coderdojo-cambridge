import { Heading } from 'legacy-ui'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import React from 'react'

export const Mentors = () => (
  <>
    <PageHeading>Mentors</PageHeading>
    <Heading2>People that volunteer at the dojo</Heading2>
    <Heading size={'lg'} color={'red.600'}>
      {' '}
      <FontAwesomeIcon icon={faPersonDigging} />
      UNDER CONSTRUCTION
    </Heading>
  </>
)


