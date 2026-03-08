import { Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack } from 'legacy-ui'
import axios from 'axios'
import React, { FC, useState } from 'react'

export const Scraper: FC = () => {
  const [url, setUrl] = useState('https://projects.raspberrypi.org/en/projects/about-me')
  const [data, setData] = useState({ title: '', slug: '' })

  function performScrape(url: string) {
    axios
      .post('api/scrape', { url })
      .then((value) => {
        setData({ title: value.data.message, slug: value.data.slug })
      })
      .catch(console.error)
  }

  return (
    <Container maxW={'container.xl'}>
      <Heading size={'2xl'} my={5}>
        Scraper
      </Heading>
      <Stack maxW={'lg'} spacing={5}>
        <FormControl>
          <FormLabel>{data.title}</FormLabel>
          <Input placeholder={'Enter URL to scrape...'} value={url} onChange={(event) => setUrl(event.target.value)} />
        </FormControl>
        <Button colorScheme='teal' size='md' onClick={(event) => performScrape(url)}>
          Button
        </Button>
        {data.slug && <Image src={`./screenshot/${data.slug}.png`} />}
      </Stack>
    </Container>
  )
}


