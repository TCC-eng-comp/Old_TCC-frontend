import { motion } from 'framer-motion'
import styled from 'styled-components'

interface StyleProps {
  size: string
  gap: string
  radius: string
}

export const Dot = styled(motion.button).attrs({
  className: 'Dot',
  type: 'button'
})``

const Style = styled.div.attrs({
  className: 'Dots'
})<StyleProps>`
  padding: 8px;

  ${Dot} {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: ${({ radius }) => radius};

    background-color: ${({ theme }) => theme.colors.secondary};

    & + ${Dot} {
      margin-left: ${({ gap }) => gap};
    }
  }

  #newLeft,
  #newRight {
    opacity: 0;
  }

  #center {
    transform: scale(1.4);
  }
`
export default Style

Dot.displayName = 'Dot-Style'
Style.displayName = 'Dots-Style'
