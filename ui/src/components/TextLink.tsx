import { Anchor } from '@mantine/core'
import React, { FC } from 'react'

export const TextLink: FC<any> = ({ href, children, ...rest }) => (
  <Anchor href={href} target='_blank' fw={700} c='blue.6' {...rest}>
    {children}
  </Anchor>
)
