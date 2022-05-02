import { Heading } from '@chakra-ui/react'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeading } from 'components/PageHeading'
import { SubHeading } from 'components/SubHeading'
import React from 'react'

export const Mentors = () => (
  <>
    <PageHeading>Mentors</PageHeading>
    <SubHeading>People that volunteer at the dojo</SubHeading>
    <Heading size={'lg'} color={'red.600'}>
      {' '}
      <FontAwesomeIcon icon={faPersonDigging} />
      UNDER CONSTRUCTION
    </Heading>
  </>
)
