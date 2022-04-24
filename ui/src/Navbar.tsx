import { Box, Button, chakra, CloseButton, Flex, HStack, LinkBox, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const NavButton: FC<{ label: string; to: string; mobile?: boolean }> = ({ label, to, mobile }) => (
  <Button as={RouterLink} variant='solid' colorScheme={'gray'} to={to} w={mobile ? 'full' : 'auto'}>
    {label}
  </Button>
)

const NavButtons: FC<{ mobile?: boolean }> = ({ mobile }) => (
  <>
    <NavButton label={'Home'} to={'/'} mobile={mobile} />
    <NavButton to={'projects'} label={'Projects'} mobile={mobile} />
    <NavButton to={'ninjas'} label={'Ninjas'} mobile={mobile} />
    <NavButton to={'parents'} label={'Parents'} mobile={mobile} />
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
  const location = useLocation()

  useEffect(() => {
    mobileNav.onClose()
    // don't add mobileNav because it messes up the menu
    // eslint-disable-next-line
  }, [location])

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
                zIndex={10}
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
              <LinkBox
                as={'div'}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                pos={'absolute'}
                top={0}
                left={0}
                right={0}
                w={'100%'}
                h={'100%'}
                onClick={mobileNav.onClose}
              />
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  )
}
