import { Anchor, Box, Burger, Button, Container, Divider, Drawer, Group, MediaQuery, Stack } from '@mantine/core'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

type NavItem = {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Topics', to: '/topics' },
  { label: 'Ninjas', to: '/ninjas' },
  { label: 'Parents', to: '/parents' },
  { label: 'Location', to: '/location' },
  { label: 'Workshops', to: '/workshops' },
]

const NavButton: FC<NavItem & { mobile?: boolean }> = ({ label, to, mobile = false }) => (
  <Button
    component={RouterLink}
    to={to}
    variant={mobile ? 'light' : 'subtle'}
    color={mobile ? 'dojoTeal' : 'gray'}
    size={mobile ? 'md' : 'sm'}
    fullWidth={mobile}
    styles={(theme) => ({
      root: mobile
        ? undefined
        : {
            color: theme.white,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
            },
          },
    })}>
    {label}
  </Button>
)

export const NavLink: FC<{ to: string; mobile?: boolean }> = ({ to, mobile, children }) => (
  <Anchor component={RouterLink} to={to} fw={700} c={mobile ? 'dojoTeal.7' : 'dojoOrange.6'} sx={{ width: mobile ? '100%' : 'auto' }}>
    {children}
  </Anchor>
)

const SignUpButton: FC<{ mobile?: boolean }> = ({ mobile = false }) => (
  <Button
    component='a'
    href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'
    target='_blank'
    color='dojoOrange'
    variant='filled'
    size={mobile ? 'md' : 'sm'}
    fullWidth={mobile}>
    Sign Up
  </Button>
)

const DesktopNav: FC = () => (
  <Group spacing='xs' position='center' noWrap>
    {navItems.map((item) => (
      <NavButton key={item.to} {...item} />
    ))}
    <SignUpButton />
  </Group>
)

const MobileNav: FC<{ onNavigate: () => void }> = ({ onNavigate }) => (
  <Stack spacing='sm'>
    {navItems.map((item, index) => (
      <Fragment key={item.to}>
        <NavButton {...item} mobile />
        {index < navItems.length - 1 && <Divider />}
      </Fragment>
    ))}
    <Divider />
    <SignUpButton mobile />
    <Button variant='default' onClick={onNavigate} fullWidth>
      Close menu
    </Button>
  </Stack>
)

export const Navbar: FC = () => {
  const [opened, setOpened] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpened(false)
  }, [location.pathname])

  return (
    <Box component='nav' sx={(theme) => ({ backgroundColor: theme.colors.dojoTeal[7], boxShadow: theme.shadows.sm })}>
      <Container fluid px='md' py='sm'>
        <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
          <Box>
            <DesktopNav />
          </Box>
        </MediaQuery>

        <MediaQuery largerThan='md' styles={{ display: 'none' }}>
          <Group position='right'>
            <Burger opened={opened} onClick={() => setOpened((current) => !current)} color='white' aria-label='Toggle menu' />
          </Group>
        </MediaQuery>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} padding='md' size='100%' title='Menu'>
        <MobileNav onNavigate={() => setOpened(false)} />
      </Drawer>
    </Box>
  )
}
