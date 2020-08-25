import React, { useContext } from 'react'
import Style from './styles'

import { useTheme } from 'hooks/useTheme'

import { ThemeContext } from 'styled-components'

const ThemeSwitch: React.FC = () => {
  const { themeState, setThemeState } = useTheme()
  const themes = useContext(ThemeContext)

  return (
    <Style
      viewBox='0 0 42 42'
      xmlns='http://www.w3.org/2000/svg'
      className='ThemeSwitch'
      onClick={() => setThemeState(!themeState)}
    >
      <g strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' stroke={themes.tertiary}>
        <path d='M21 40.25L21 36.75' />
        <path d='M21 5.25L21 1.75' />
        <path d='M34.6152 34.6152L32.1302 32.1302' />
        <path d='M40.25 21L36.75 21' />
        <path d='M34.6152 7.38512L32.1302 9.87012' />

        <path
          fill={themeState ? themes.primary : 'none'}
          d='M29.75 21C29.75 15.75 26.25 12.25 21 12.25L21 29.75C26.25 29.75 29.75 26.25 29.75 21Z'
        />
        <path
          fill={themeState ? 'none' : themes.primary}
          d='M12.25 21C12.25 26.25 15.75 29.75 21 29.75L21 12.25C15.75 12.25 12.25 15.75 12.25 21Z'
        />
      </g>
    </Style>
  )
}

export default ThemeSwitch