import Form from 'components/Form'

import styled from 'styled-components'

interface StyleProps {
  isAdmin: boolean
  editing: boolean
}

export const Remove = styled.div`
  left: 0;

  background-color: ${({ theme }) => theme.colors.red};
`

export const Edit = styled.div`
  right: 0;

  background-color: ${({ theme }) => theme.colors.primary};

  #CloseIcon {
    height: 18px;

    stroke: ${({ theme }) => theme.colors.secondary};
  }
`

export const Edict = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 44px;
  border-radius: 0 0 8px 8px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .Icon {
    height: 18px;
    margin-right: 8px;

    background-color: ${({ theme }) => theme.colors.primary};
    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Begin = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  font-size: clamp(1.3rem, 0.6rem + 2.6vw, 2rem);

  .Field {
    height: 42px;
    margin-left: 4px;
  }

  #label {
    margin-bottom: 8px;
  }

  @media screen and (min-width: 545px) {
    .Field {
      .CalendarSize {
        font-size: 9px !important;
      }

      > div {
        width: 180px;
      }
    }
  }

  @media screen and (min-width: 900px) {
    flex-direction: row;

    span {
      margin-bottom: 0px;
    }
  }
`

const Style = styled(Form)<StyleProps>`
  .AnimatedList {
    .Header {
      padding: ${({ isAdmin, editing }) => {
        if (isAdmin && editing) return '0 48px'
        return isAdmin ? '0 48px 0 0' : '0'
      }};

      transition: padding ease-in-out 0.5s;
    }

    .Content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      width: 100%;
      padding: 8px;
      border-radius: 0px 0px 16px 16px;

      border: solid 1px ${({ theme }) => theme.colors.tertiary};

      > * + * {
        margin-top: 16px;
      }

      p {
        margin-top: 0px;
        word-break: break-all;
      }

      .Submit {
        width: 100%;
      }

      .Textarea {
        min-width: 100%;

        textarea {
          background-color: transparent;
        }
      }

      ${Edit}, ${Remove} {
        position: absolute;
        top: 0;
        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 48px;
        height: 54px;
        margin-top: 0px;

        .Icon {
          height: 22px;

          fill: ${({ theme }) => theme.colors.secondary};
        }
      }
    }
  }

  @media screen and (min-width: 400px) {
    .AnimatedList .Content {
      padding: 16px;
    }
  }
`

export default Style

Edit.displayName = 'Edit-Style'
Edict.displayName = 'Edict-Style'
Begin.displayName = 'Begin-Style'
Style.displayName = 'Season-Style'
