import { Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { FC, useState } from 'react'

export const Scraper: FC = () => {
  const [url, setUrl] = useState('https://projects.raspberrypi.org/en/projects/raspberry-pi-getting-started')
  const [data, setData] = useState({ title: '', slug: '' })

  function performScrape(url: string) {
    axios
      .post('api/scrape', { url })
      .then((value) => {
        setData({ title: value.data.message, slug: value.data.slug })
      })
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
          <FormLabel>{data.title}</FormLabel>
          <Input placeholder={'Enter URL to scrape...'} value={url} onChange={(event) => setUrl(event.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="md" onClick={(event) => performScrape(url)}>
          Button
        </Button>
        {data.slug && <Image src={`./screenshot/${data.slug}.png`} />}
      </Stack>
    </Container>
  )
}
