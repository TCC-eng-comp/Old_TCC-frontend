import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.section`
  grid-area: about;
  min-width: 320px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 1s;
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('primary')};
`

export default Style
