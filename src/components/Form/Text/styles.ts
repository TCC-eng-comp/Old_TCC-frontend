import { TextColors } from './'

import { lighten } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  hasEye: boolean
  isDate: boolean
  hasIcon: boolean
  hidden?: boolean
  optional: boolean
  isFilled: boolean
  colors: TextColors
  isErrored: boolean
}

export const IconSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  margin: 0 2%;
  max-width: 40px;
  min-width: 40px;

  .Icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: clamp(24px, 2vh, 30px);
    height: clamp(24px, 2vh, 30px);
  }
`

const Style = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;

  border-radius: 10px;
  height: clamp(40px, 3vh + 2vw, 44px);

  border: solid 1px ${({ colors }) => colors.unfocused};

  &:focus-within {
    border-color: ${({ colors }) => colors.focused};

    &,
    input::placeholder,
    ${IconSpace} .Icon {
      fill: ${({ colors }) => colors.focused};
      stroke: ${({ colors }) => colors.focused};
      -webkit-text-fill-color: ${({ colors }) => colors.focused};
    }
  }

  ${IconSpace} .Icon {
    fill: ${({ colors }) => colors.unfocused};
  }

  input {
    height: 100%;
    border-radius: 10px;

    border: none;
    color: ${({ color }) => color};
    background-color: transparent !important;
    -webkit-text-fill-color: ${({ color }) => color};

    &::placeholder {
      color: ${({ colors }) => colors.unfocused};
      -webkit-text-fill-color: ${({ colors }) => colors.unfocused};

      ${({ optional, theme }) =>
        optional &&
        css`
          font-style: italic;

          color: ${lighten(0.1, theme.colors.tertiary)};
          -webkit-text-fill-color: ${lighten(0.1, theme.colors.tertiary)};
        `}
    }

    ${({ isDate }) =>
      isDate &&
      css`
        cursor: pointer;
      `}

    ${({ hasEye, hasIcon }) =>
      hasEye && hasIcon
        ? css`
            width: calc(100% - 80px);
          `
        : css`
            width: calc(100% - 40px);
          `}

    ${({ hasIcon }) =>
      !hasIcon &&
      css`
        width: 100%;
        padding-left: 16px;
      `}

    ${({ isErrored }) =>
      isErrored &&
      css`
        padding-left: 0px;
      `}
  }

  ${({ isFilled, colors }) =>
    isFilled &&
    css`
      &,
      ${IconSpace} .Icon {
        fill: ${colors.focused};
        stroke: ${colors.focused};
        -webkit-text-fill-color: ${colors.focused};
      }
    `}
`

export default Style

IconSpace.displayName = 'IconSpace-Style'
Style.displayName = 'Text-Style'
