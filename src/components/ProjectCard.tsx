import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LanguageTag } from 'components/LanguageTag'
import { LevelTag } from 'components/LevelTag'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug }) => (
  <Box key={title} border={'1px solid'} borderColor={'gray.500'} bgColor={'white'} borderRadius={5}>
    <Box h={[300, null, 250]} overflow={'hidden'} borderTopRadius={5}>
      <Image w={'100%'} src={`./screenshot/${slug}.png`} />
    </Box>
    <Box p={5}>
      <Heading size={'md'} color={'custom.teal'}>
        {title}
      </Heading>
      <Box my={2}>
        <LanguageTag language={language} /> <LevelTag level={level} />
      </Box>
      <Flex w={'full'} justifyContent={'end'}>
        <Button colorScheme={'blue'} size={'md'} onClick={() => window.open(url, '_blank')} rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
          View on raspberrypi.org
        </Button>
      </Flex>
    </Box>
  </Box>
)
