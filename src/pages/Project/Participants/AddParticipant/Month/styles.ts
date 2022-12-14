import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  showTask: boolean
  showBorder: boolean
}

export const Header = styled(motion.div)`
  position: relative;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 44px;
  font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.8rem);

  background-color: ${({ theme }) => darken(0.17, theme.colors.tertiary)};

  button {
    width: 50%;
    padding: 0px;
    height: 100%;
    font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.8rem);
  }

  #ArrowIcon {
    height: 12px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.secondary};
  }

  #InterrogationIcon {
    position: absolute;
    right: 24px;
    top: 50%;

    width: 24px;
    height: 24px;
    transform: translateY(-50%);

    fill: ${({ theme }) => theme.colors.secondary};
  }

  .Text {
    height: 90%;
    width: calc(50% - 72px);

    input {
      min-height: 44px;
      padding-left: 4px;
    }
  }
`

const Style = styled(motion.li)<StyleProps>`
  position: relative;
  z-index: 2;

  cursor: pointer;
  border-radius: 16px;
  font-size: clamp(1rem, 0.6rem + 2.6vw, 1.6rem);

  box-shadow: ${({ theme }) => theme.shadow.normal};
  background-color: ${({ theme }) => theme.colors.tertiary};

  & + .Month {
    margin-top: 24px;
  }

  button {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .Textarea {
    position: relative;
    height: auto;
    z-index: ${({ showTask }) => (showTask ? 2 : -1)};

    textarea {
      height: auto;
      border: none;
      padding: 16px;
      background-color: transparent;
    }
  }

  .Text,
  .Textarea {
    ${({ showBorder }) =>
      showBorder
        ? css`
            border-radius: 8px;

            border: dashed 1px ${({ theme }) => theme.colors.secondary};
          `
        : css`
            border: none;
          `}
  }
`

export default Style

Header.displayName = 'Header-Style'
Style.displayName = 'Month-Style'
