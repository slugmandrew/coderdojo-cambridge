import { Box, Button, Image, Stack, TextInput, Title } from '@mantine/core'
import axios from 'axios'
import React, { FC, useState } from 'react'

export const Scraper: FC = () => {
  const [url, setUrl] = useState('https://projects.raspberrypi.org/en/projects/about-me')
  const [data, setData] = useState({ title: '', slug: '' })

  function performScrape(value: string) {
    axios
      .post('api/scrape', { url: value })
      .then((response) => {
        setData({ title: response.data.message, slug: response.data.slug })
      })
      .catch(console.error)
  }

  return (
    <Box maw={720}>
      <Title order={1} mb='md'>
        Scraper
      </Title>
      <Stack>
        <TextInput
          label={data.title || 'URL to scrape'}
          placeholder='Enter URL to scrape...'
          value={url}
          onChange={(event) => setUrl(event.currentTarget.value)}
        />
        <Button color='dojoTeal' onClick={() => performScrape(url)}>
          Scrape
        </Button>
        {data.slug && <Image src={`./screenshot/${data.slug}.png`} alt={data.title} />}
      </Stack>
    </Box>
  )
}
