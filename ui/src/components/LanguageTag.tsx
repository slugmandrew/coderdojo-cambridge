import { Tag, useBreakpointValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ColorScheme } from 'types/ColorScheme'
import { LanguageName } from 'types/LanguageName'

export const LanguageTag: FC<{ language: LanguageName }> = ({ language }) => {
  const getColorScheme: (language: LanguageName) => ColorScheme = (language: LanguageName) => {
    switch (language) {
      case LanguageName.hardware:
        return 'gray'
      case LanguageName.scratch:
        return 'orange'
      case LanguageName.python:
        return 'blue'
      case LanguageName.unity:
        return 'blackAlpha'
      case LanguageName.java:
        return 'red'
      case LanguageName.html:
        return 'green'
    }
  }

  const tagSize = useBreakpointValue({ base: 'lg', md: 'md' })

  return (
    <>
      <Tag size={tagSize} colorScheme={getColorScheme(language)}>
        {language}
      </Tag>
    </>
  )
}
