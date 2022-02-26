import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

export const Scraper = () => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  function performScrape(url: string) {
    axios
      .get('https://cors-anywhere.herokuapp.com/' + url)
      .then((value) => setTitle(value.data))
      .catch(console.error)
  }

  // Tiny change
  return (
    <Container maxW={'container.xl'}>
      <Heading color={'custom.teal'} size={'xl'} paddingY={5}>
        Scraper
      </Heading>
      <Stack maxW={'lg'} spacing={5}>
        <FormControl>
          <FormLabel>{title}</FormLabel>
          <Input placeholder={'Enter URL to scrape...'} value={url} onChange={(event) => setUrl(event.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="md" onClick={(event) => performScrape(url)}>
          Button
        </Button>
      </Stack>
    </Container>
  )
}
