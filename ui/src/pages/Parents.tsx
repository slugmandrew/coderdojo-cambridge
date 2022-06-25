import { Heading } from '@chakra-ui/react'
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import React from 'react'

export const Parents = () => (
  <>
    <PageHeading>Parents</PageHeading>
    <Heading2>Information for parents</Heading2>
    <Heading size={'lg'} color={'red.600'}>
      {' '}
      <FontAwesomeIcon icon={faPersonDigging} />
      UNDER CONSTRUCTION
    </Heading>
  </>
)
