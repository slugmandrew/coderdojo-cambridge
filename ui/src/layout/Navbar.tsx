import { Anchor, Burger, Button, Divider, Drawer, Group, Stack } from '@mantine/core'
import { useMentor } from 'auth/MentorContext'
import React, { FC, ReactNode, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router'

const navItems = [
  { label: 'Projects', to: '/projects' },
  { label: 'Coders', to: '/coders' },
  { label: 'Parents', to: '/parents' },
  { label: 'Visit us', to: '/location' },
  { label: 'Workshops', to: '/workshops' },
]

export const NavLink: FC<{ to: string; mobile?: boolean; children?: ReactNode }> = ({ to, children }) => (
  <Anchor component={RouterLink} to={to} fw={800} c='clubTeal.7'>
    {children}
  </Anchor>
)

export const Navbar = () => {
  const auth = useMentor()
  const [opened, setOpened] = useState(false)
  const location = useLocation()

  const links = navItems.map((item) => (
    <Anchor
      key={item.to}
      component={RouterLink}
      to={item.to}
      aria-current={location.pathname === item.to ? 'page' : undefined}
      onClick={() => setOpened(false)}
      className='nav-link'
      data-active={location.pathname === item.to || undefined}
      underline='never'>
      {item.label}
    </Anchor>
  ))

  return (
    <>
      <Group gap={4} visibleFrom='lg' wrap='nowrap'>
        {links}
        {auth.authenticated && (
          <Anchor component={RouterLink} to='/manage/schedule' className='nav-link' underline='never'>
            Mentor tools
          </Anchor>
        )}
        <Button component='a' href='https://codeclub.org/en/clubs/gb/cambridge/cambridge-makespace' target='_blank' ml='sm' color='clubOrange'>
          Get tickets
        </Button>
      </Group>

      <Burger opened={opened} onClick={() => setOpened((current) => !current)} hiddenFrom='lg' aria-label='Toggle menu' />
      <Drawer opened={opened} onClose={() => setOpened(false)} padding='lg' size='min(100%, 380px)' position='right' title='Menu'>
        <Stack gap={0} className='mobile-navigation'>
          <Anchor component={RouterLink} to='/' onClick={() => setOpened(false)} className='mobile-nav-link'>
            Home
          </Anchor>
          {links}
          {auth.authenticated && (
            <Anchor component={RouterLink} to='/manage/schedule' onClick={() => setOpened(false)} className='mobile-nav-link'>
              Mentor tools
            </Anchor>
          )}
          <Divider my='lg' />
          <Button component='a' href='https://codeclub.org/en/clubs/gb/cambridge/cambridge-makespace' target='_blank' size='lg' color='clubOrange'>
            Get tickets
          </Button>
        </Stack>
      </Drawer>
    </>
  )
}
