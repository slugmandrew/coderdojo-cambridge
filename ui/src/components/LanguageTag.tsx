import { Badge } from '@mantine/core'
import React, { FC } from 'react'
import { LanguageName } from 'types/LanguageName'

export const LanguageTag: FC<{ language: LanguageName }> = ({ language }) => {
  const getColorScheme = (value: LanguageName) => {
    switch (value) {
      case LanguageName.hardware:
        return 'gray'
      case LanguageName.scratch:
        return 'orange'
      case LanguageName.python:
        return 'blue'
      case LanguageName.unity:
        return 'dark'
      case LanguageName.java:
        return 'red'
      case LanguageName.html:
        return 'green'
      case LanguageName.makecode:
        return 'pink'
    }
  }

  return (
    <Badge size='lg' color={getColorScheme(language)} variant='light'>
      {language}
    </Badge>
  )
}
