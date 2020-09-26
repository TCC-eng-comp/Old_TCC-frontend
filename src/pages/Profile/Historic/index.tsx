import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

import { useSelector, RootState, ThemeState } from 'store'

const Historic: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={ulData} selected='historic'>
      <Style theme={theme}>
        <h1>Historic</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Historic
