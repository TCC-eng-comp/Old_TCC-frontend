//import fromTheme from 'utils/fromTheme'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Style = styled(Link)`
  display: flex;
  align-items: center;

  color: #6e4850;
  transition: all 0.2s;

  &:hover {
    color: #ec5878;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export default Style
