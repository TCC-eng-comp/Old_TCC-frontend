import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
  hasEye: boolean
  eyeSize?: string
  iconSize?: string
}

const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;

  min-height: 35px;
  height: 5vh;
  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;

  background-color: transparent;
  border: solid 1px ${fromTheme('tertiary')};


  svg {
    width: 15%;
    height: ${({ iconSize }) => iconSize};
    color: ${fromTheme('tertiary')};
  }

  input + svg {
    height: ${({ eyeSize }) => eyeSize};
    color: ${fromTheme('tertiary')};
  }

  input {
    background-color: transparent;
    border: none;
    color: ${fromTheme('primary')};
    -webkit-text-fill-color: ${fromTheme('primary')};
    width: ${({ hasEye }) => (hasEye ? '70%' : '85%')};

    &::placeholder {
      color: ${fromTheme('tertiary')};
      -webkit-text-fill-color: ${fromTheme('tertiary')};
    }
  }



  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${fromTheme('primary')};

      &,
      input::placeholder,
      svg,
      input + svg {
        color: ${fromTheme('primary')};
        -webkit-text-fill-color: ${fromTheme('primary')};
      }
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${fromTheme('primary')};

      &,
      input::placeholder,
      svg {
        color: ${fromTheme('primary')};
        -webkit-text-fill-color: ${fromTheme('primary')};
      }
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      svg {
        color: ${fromTheme('primary')};
        -webkit-text-fill-color: ${fromTheme('primary')};
      }
    `}

  ${({ hasIcon, isErrored }) =>
    !hasIcon &&
    !isErrored &&
    css`
      input {
        padding-left: 20px;
      }
    `}`

export default Style
