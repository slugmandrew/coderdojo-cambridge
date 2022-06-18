import { Box, Button, Flex, Heading, HStack, Image, useBreakpointValue } from '@chakra-ui/react'
import { faPython, faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LanguageTag } from 'components/LanguageTag'
import { LevelTag } from 'components/LevelTag'
import React, { FC } from 'react'
import { Project } from 'types/Project'

export const ProjectCard: FC<Project> = ({ language, level, url, title, slug, domain = 'raspberrypi.org' }) => {
  const buttonSize = useBreakpointValue({ base: 'lg', md: 'md' })

  return (
    <Box key={title} border={'1px solid'} borderColor={'gray.200'} bgColor={'gray.50'} borderRadius={5}>
      <Box h={[160, 130, 120]} overflow={'hidden'} borderTopRadius={5}>
        <Image w={'100%'} src={`./screenshot/${slug}.png`} />
      </Box>
      <Box p={5}>
        <Heading size={'md'} color={'custom.teal'}>
          {title}
        </Heading>
        <HStack my={3}>
          <LanguageTag language={language} /> <LevelTag levels={level} />
        </HStack>
        <Flex w={'full'} justifyContent={'end'}>
          <Button
            colorScheme={'blue'}
            size={buttonSize}
            onClick={() => window.open(url, '_blank')}
            leftIcon={<FontAwesomeIcon icon={domain === 'raspberrypi.org' ? faRaspberryPi : faPython} />}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
            View on {domain}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
