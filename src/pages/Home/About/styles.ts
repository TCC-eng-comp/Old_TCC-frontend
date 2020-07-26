import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: about;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 1s;
  background-color: ${fromTheme('primary')};
`