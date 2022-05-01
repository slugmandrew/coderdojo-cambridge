import { Heading } from '@chakra-ui/react'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeading } from 'components/PageHeading'
import { SubHeading } from 'components/SubHeading'
import React from 'react'

export const Ninjas = () => (
  <>
    <PageHeading>Ninjas</PageHeading>
    <SubHeading>Information for ninjas</SubHeading>
    <Heading size={'lg'} color={'red.600'}>
      {' '}
      <FontAwesomeIcon icon={faPersonDigging} />
      UNDER CONSTRUCTION
    </Heading>
  </>
)
