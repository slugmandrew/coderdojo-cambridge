import { Box, Image, SimpleGrid, Text, Title } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const TopicLayout: FC<{ title: ReactNode; body: ReactNode; images?: Array<{ src: string; alt: string; caption: ReactNode }> }> = ({
  title,
  body,
  images = [],
}) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
      <Box>
        <Title order={2} mb='md'>
          {title}
        </Title>
        {body}
      </Box>
      <Box>
        {images.map((image) => (
          <Box key={image.alt} mb='lg'>
            <Image src={image.src} alt={image.alt} radius='md' />
            <Text mt='sm'>{image.caption}</Text>
          </Box>
        ))}
      </Box>
    </SimpleGrid>
  )
}
