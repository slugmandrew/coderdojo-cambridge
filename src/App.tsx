import { Container, VStack } from '@chakra-ui/react'
import { FilteredGrid } from 'components/FilteredGrid'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import React from 'react'
import { LanguageName } from 'types/LanguageName'
import { Level } from 'types/Level'

export const App = () => (
  <Container maxW={'full'} minW={'container.xs'} padding={0}>
    <Header />
    <VStack maxW={'full'} h={'full'} padding={[2, null, 4, 8]} bgColor={'gray.50'} borderBottom={'1px solid'} borderBottomColor={'gray.500'}>
      <FilteredGrid
        filters={[
          { label: 'Language', type: LanguageName },
          { label: 'Level', type: Level },
          // { label: 'Track', type: TrackName },
        ]}
      />
    </VStack>
    <Footer />
  </Container>
)
