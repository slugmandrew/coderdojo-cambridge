import { Box, Button, chakra, CloseButton, Flex, HStack, IconButton, useColorModeValue, useDisclosure, VStack, Text, Heading } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const NavButton: FC<{ label: string; to: string; mobile?: boolean }> = ({ label, to, mobile }) => (
  <Button as={RouterLink} variant='ghost' colorScheme={'teal'} to={to} w={mobile ? 'full' : 'auto'}>
    {label}
  </Button>
)

const NavButtons: FC<{ mobile?: boolean }> = ({ mobile }) => (
  <>
    <NavButton label={'Home'} to={'/'} mobile={mobile} />
    <NavButton to={'about'} label={'About'} mobile={mobile} />
    <NavButton to={'projects'} label={'Projects'} mobile={mobile} />
    <NavButton to={'ninjas'} label={'Ninjas'} mobile={mobile} />
    <NavButton to={'seasons'} label={'Seasons'} mobile={mobile} />
    <NavButton to={'location'} label={'Location'} mobile={mobile} />
    <Button as={RouterLink} colorScheme={'teal'} size='sm' to={'somewhere'} w={mobile ? 'full' : 'auto'}>
      Sign Up
    </Button>
  </>
)

export const Navbar: FC = () => {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const mobileNav = useDisclosure()
  return (
    <>
      <chakra.header bg={bg} w='full' px={{ base: 2, sm: 4 }} py={3} shadow='md'>
        <Flex alignItems='center' justifyContent='center' mx='auto'>
          <HStack display='flex' alignItems='center' spacing={1}>
            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }} justifyItems={'center'}>
              <NavButtons />
            </HStack>

            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <Button
                size={'md'}
                display={{ base: 'flex', md: 'none' }}
                fontSize={'22px'}
                aria-label='Open menu'
                colorScheme={'teal'}
                variant='solid'
                leftIcon={<FontAwesomeIcon icon={faBars} />}
                onClick={mobileNav.onOpen}>
                Menu
              </Button>

              <VStack
                pos='absolute'
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection='column'
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded='sm'
                shadow='sm'>
                <CloseButton aria-label='Close menu' onClick={mobileNav.onClose} />
                <NavButtons mobile />
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  )
}
