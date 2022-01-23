import React, { FC } from 'react'
import { Project } from './Data'
import { Box, Heading, Link, Text } from '@chakra-ui/react'

const ProjectCard: FC<Project> = ({
  language,
  level,
  url,
  title,
  children,
}) => (
  <>
    <Box
      // w={'100%'}
      h={'100%'}
      p={5}
      key={title}
      border={'3px dashed'}
      borderColor={'brand.orange'}
      bgColor={'white'}
    >
      <Heading size={'md'}>{title}</Heading>
      <Text>{language}</Text>
      <Link href={url} target={'_blank'}>
        {url}
      </Link>
    </Box>
  </>
)

export default ProjectCard
