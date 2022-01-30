import React, { FC } from 'react'
import { Tag } from '@chakra-ui/react'
import { LanguageName } from './Data'
import { ColorScheme } from './ColorScheme'

export const LanguageTag: FC<{ language: LanguageName }> = ({ language }) => {
  const getColorScheme: (language: LanguageName) => ColorScheme = (language: LanguageName) => {
    switch (language) {
      case 'Scratch':
        return 'orange'
      case 'Python':
        return 'blue'
      case 'Unity':
        return 'blackAlpha'
      case 'Java':
        return 'red'
      case 'HTML':
        return 'green'
    }
  }
  return (
    <>
      <Tag size={'lg'} colorScheme={getColorScheme(language)}>
        {language}
      </Tag>
    </>
  )
}
