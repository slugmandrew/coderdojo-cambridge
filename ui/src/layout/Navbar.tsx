import { Box, Button, chakra, Flex, HStack, Link, LinkBox, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { faBars, faRemove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const NavButton: FC<{ label: string; to: string; mobile?: boolean }> = ({ label, to, mobile }) => (
  <Button size={mobile ? 'lg' : 'sm'} as={RouterLink} variant={'ghost'} colorScheme={'whiteAlpha'} to={to} w={mobile ? 'full' : 'auto'}>
    {label}
  </Button>
)

export const NavLink: FC<{ to: string; mobile?: boolean }> = ({ to, mobile, children }) => (
  <Link as={RouterLink} color={'custom.orange'} to={to} w={mobile ? 'full' : 'auto'} variant={'bold'}>
    {children}
  </Link>
)

const NavButtons: FC<{ mobile?: boolean }> = ({ mobile }) => (
  <>
    <NavButton label={'Home'} to={'/'} mobile={mobile} />
    <NavButton to={'projects'} label={'Projects'} mobile={mobile} />
    <NavButton to={'seasons'} label={'Seasons'} mobile={mobile} />
    <NavButton to={'ninjas'} label={'Ninjas'} mobile={mobile} />
    <NavButton to={'parents'} label={'Parents'} mobile={mobile} />
    <NavButton to={'mentors'} label={'Mentors'} mobile={mobile} />
    <NavButton to={'location'} label={'Location'} mobile={mobile} />
    <NavButton to={'workshops'} label={'Workshops'} mobile={mobile} />
    <Button
      as={Link}
      variant={'primary'}
      size={mobile ? 'lg' : 'sm'}
      href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'}
      target={'_blank'}
      w={mobile ? 'full' : 'auto'}>
      Sign Up
    </Button>
  </>
)

export const Navbar: FC = () => {
  const bg = useColorModeValue('teal.600', 'gray.800')
  const mobileNav = useDisclosure()
  const location = useLocation()

  useEffect(() => {
    mobileNav.onClose()
    // don't add mobileNav because it messes up the menu
    // eslint-disable-next-line
  }, [location])

  return (
    <>
      <chakra.header bg={bg} w='full' px={{ base: 2, sm: 4 }} py={2} shadow='md' borderBottomWidth={0} borderBottomColor={'custom.teal'}>
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
                variant='ghost'
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
                <Button size={'md'} aria-label='Close menu' onClick={mobileNav.onClose} variant={'ghost'}>
                  <FontAwesomeIcon icon={faRemove} />
                </Button>
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
