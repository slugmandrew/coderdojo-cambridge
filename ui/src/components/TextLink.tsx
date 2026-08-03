import { Anchor } from '@mantine/core'
import React, { FC, ReactNode } from 'react'

export const TextLink: FC<{ href?: string; target?: string; children?: ReactNode }> = ({ href, children, target = '_blank' }) => {
  return (
    <Anchor href={href} target={target} fw={700} c='blue.6'>
      {children}
    </Anchor>
  )
}
