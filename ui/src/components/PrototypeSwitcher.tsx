import { ActionIcon, Group, Paper, Text } from '@mantine/core'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

type Variant = { key: string; name: string }

export const PrototypeSwitcher = ({ variants, current }: { variants: Variant[]; current: string }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const changeVariant = (offset: number) => {
    const currentIndex = Math.max(
      variants.findIndex((variant) => variant.key === current),
      0,
    )
    const nextVariant = variants[(currentIndex + offset + variants.length) % variants.length]
    const search = new URLSearchParams(location.search)
    search.set('variant', nextVariant.key)
    navigate({ pathname: location.pathname, search: search.toString() }, { replace: true })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, [contenteditable="true"]')) return
      if (event.key === 'ArrowLeft') changeVariant(-1)
      if (event.key === 'ArrowRight') changeVariant(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const active = variants.find((variant) => variant.key === current) ?? variants[0]

  return (
    <Paper className='prototype-switcher' bg='dark.8' c='white' radius='xl' shadow='xl' p='xs'>
      <Group gap='xs' wrap='nowrap'>
        <ActionIcon variant='subtle' color='white' aria-label='Previous design' onClick={() => changeVariant(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </ActionIcon>
        <Text size='sm' fw={800} ta='center' miw={190}>
          {active.key} — {active.name}
        </Text>
        <ActionIcon variant='subtle' color='white' aria-label='Next design' onClick={() => changeVariant(1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </ActionIcon>
      </Group>
    </Paper>
  )
}
