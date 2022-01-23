import React, { FC } from 'react'
import { Project } from './Data'
import { Box, Heading, Image, Link, Text } from '@chakra-ui/react'

const ProjectCard: FC<Project> = ({ language, level, url, title, slug, children }) => (
  <>
    <Box key={title} border={'1px solid'} borderColor={'gray.500'} bgColor={'white'} borderRadius={5}>
      <Box h={250} overflow={'hidden'} borderTopRadius={5}>
        <Image w={'100%'} src={`./screenshot-${slug}.png`} />
      </Box>
      <Box p={5}>
        <Heading size={'md'}>{title}</Heading>
        <Text>
          [{language}] [{level}]
        </Text>
        <Link href={url} target={'_blank'}>
          {url}
        </Link>
      </Box>
    </Box>
  </>
)

export default ProjectCard
