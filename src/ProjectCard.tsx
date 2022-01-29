import React, { FC } from 'react'
import { Project } from './Data'
import { Box, Heading, Image, Link } from '@chakra-ui/react'
import { LanguageTag } from './LanguageTag'
import { LevelTag } from './LevelTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug }) => (
  <Box key={title} border={'1px solid'} borderColor={'gray.500'} bgColor={'white'} borderRadius={5}>
    <Box h={[100, 200, 250]} overflow={'hidden'} borderTopRadius={5}>
      <Image w={'100%'} src={`./screenshot-${slug}.png`} />
    </Box>
    <Box p={5}>
      <Heading size={'md'} color={'custom.teal'}>
        {title}
      </Heading>
      <Box my={2}>
        <LanguageTag language={language} /> <LevelTag level={level} />
      </Box>
      <Box>
        <FontAwesomeIcon icon={faLink} />{' '}
        <Link href={url} target={'_blank'} color={'custom.orange'}>
          Open
        </Link>
      </Box>
    </Box>
  </Box>
)
