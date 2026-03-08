import { Anchor, Box, Burger, Button, Container, Drawer, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { FC, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/topics', label: 'Topics' },
  { to: '/ninjas', label: 'Ninjas' },
  { to: '/parents', label: 'Parents' },
  { to: '/location', label: 'Location' },
  { to: '/workshops', label: 'Workshops' },
]

const NavButton: FC<{ to: string; label: string; mobile?: boolean }> = ({ to, label, mobile }) => (
  <Button component={Link} to={to} variant='subtle' color='gray' fullWidth={mobile}>
    {label}
  </Button>
)

export const NavLink: FC<{ to: string; mobile?: boolean }> = ({ to, children }) => (
  <Anchor component={Link} to={to} c='orange.7' fw={700}>
    {children}
  </Anchor>
)

export const Navbar: FC = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const location = useLocation()

  useEffect(() => close(), [location.pathname, close])

  return (
    <Box bg='#0f766e' py={8}>
      <Container size='xl'>
        <Group position='apart'>
          <Group spacing='xs' sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
            {links.map((item) => (
              <NavButton key={item.to} to={item.to} label={item.label} />
            ))}
            <Button component='a' href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace' target='_blank' color='orange'>
              Sign Up
            </Button>
          </Group>
          <Burger sx={{ '@media (min-width: 769px)': { display: 'none' } }} opened={opened} onClick={open} color='white' aria-label='Open navigation' />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={close} title='Menu' sx={{ '@media (min-width: 769px)': { display: 'none' } }} position='right'>
        <Group grow>
          {links.map((item) => (
            <NavButton key={item.to} to={item.to} label={item.label} mobile />
          ))}
          <Button fullWidth component='a' href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace' target='_blank' color='orange'>
            Sign Up
          </Button>
        </Group>
      </Drawer>
    </Box>
  )
}



