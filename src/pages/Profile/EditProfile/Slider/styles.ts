import styled from 'styled-components'

import { animated } from 'react-spring'

interface StyleProps {
  cardwidth: string
  gap: string
}

export const Animation = styled(animated.div)``

const Style = styled(animated.div)<StyleProps>`
  flex-direction: column;

  &,
  .sliderWrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 64px;
  }

  ${Animation} {
    height: 100%;
    width: ${({ cardwidth }) => cardwidth};
  }

  ${Animation} + ${Animation} {
    margin-left: ${({ gap }) => gap};
  }
`

export default Style
