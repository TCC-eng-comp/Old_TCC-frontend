import { getStatusColor, StatusTypes } from 'utils/status'

import { Role } from 'store/AsyncThunks/roles'

import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface InfosProps {
  userRole?: Role
  status?: StatusTypes
}

export const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
  padding: 8px;

  div {
    margin-top: 8px;
  }

  & + & {
    margin-top: 16px;
  }
`

export const Infos = styled.div<InfosProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 32px 0 24px 0;
  padding-bottom: 16px;

  border: solid ${({ theme }) => theme.colors.secondary} 1px;

  hr {
    border: solid 1px ${({ theme }) => theme.colors.secondary};
    margin-bottom: 16px;
  }

  #avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #title {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 16px 0;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${Field} {
    #status {
      color: ${({ theme, status }) => getStatusColor(theme, status)};
    }

    ${({ theme, userRole }) =>
      userRole &&
      css`
        #role {
          color: ${theme.roles[userRole]};
        }
      `}
  }

  @media screen and (min-width: 545px) {
    ${Field} {
      flex-direction: row;

      div {
        margin: 0 0 0 8px;
      }
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: max(100vw, 320px);
  height: 95vh;
  padding: 24px 16px 24px 24px;
  border-radius: 8px;
  overflow-y: scroll;

  background-color: ${({ theme }) => theme.colors.tertiary};

  > *,
  form > * {
    width: 100%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 8px 16px;
    border-radius: 0 0 16px 16px;
    transition: all 0.3s ease-in-out;
    font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.6rem);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
    }

    .Icon {
      height: 16px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  .Submit {
    margin-top: 16px;
  }

  #CloseIcon {
    position: absolute;
    top: 22px;
    right: 24px;

    stroke: ${({ theme }) => theme.colors.secondary};

    path {
      height: 16px;
      width: 16px;
    }
  }

  #delete {
    position: absolute;
    top: 16px;
    left: 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    width: auto;
    padding: 8px;
    height: 32px;
    font-size: 1.6rem;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.secondary};

    #TrashIcon {
      min-width: 18px;
      min-height: 18px;
      margin-right: 8px;

      #verticalStrokes {
        fill: ${({ theme }) => theme.colors.primary};
      }

      #background {
        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  #radios {
    display: flex;
    justify-content: space-evenly;

    margin: 16px 0;

    color: ${({ theme }) => theme.colors.secondary};

    div {
      position: relative;

      padding: 8px;
      width: 50%;
      height: 100%;
      border-radius: 8px 0 0 8px;
      transition: all 300ms ease;

      &,
      label {
        z-index: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
      }

      &#radioAccept {
        &:hover {
          .wrapper {
            width: 100%;

            background-color: ${({ theme }) => darken(0.1, theme.colors.green)};
          }
        }

        .wrapper {
          right: 0px;
        }
      }

      &#radioReject {
        border-radius: 0px 8px 8px 0px;

        &:hover {
          .wrapper {
            width: 100%;

            background-color: ${({ theme }) => theme.colors.red};
          }
        }

        .wrapper {
          border-radius: 0px 8px 8px 0px;
          left: 0px;
        }
      }

      input {
        display: none;
      }

      .wrapper {
        position: absolute;
        top: 0px;
        z-index: 0;

        width: 0px;
        height: 100%;

        background-color: transparent;
      }

      .CheckboxIcon {
        width: 24px;
        margin-right: 8px;
      }
    }
  }

  #doc {
    display: flex;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  #feedback {
    p {
      margin-top: 8px;
      word-wrap: break-word;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
    }
  }

  #dots {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 50%;
  }

  #pretext {
    padding: 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};

    p {
      padding: 8px 16px;
    }
  }

  @media screen and (min-width: 545px) {
    width: max(80vw, 320px);
  }
`

export default Style

Style.displayName = 'ResponseContent-Style'