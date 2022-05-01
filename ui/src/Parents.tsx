import { Heading } from '@chakra-ui/react'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeading } from 'components/PageHeading'
import { SubHeading } from 'components/SubHeading'
import React from 'react'

export const Parents = () => (
  <>
    <PageHeading>Parents</PageHeading>
    <SubHeading>Information for parents</SubHeading>
    <Heading size={'lg'} color={'red.600'}>
      {' '}
      <FontAwesomeIcon icon={faPersonDigging} />
      UNDER CONSTRUCTION
    </Heading>
  </>
)
