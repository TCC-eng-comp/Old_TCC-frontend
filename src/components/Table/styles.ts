import { darken } from 'polished'
import styled from 'styled-components'

export const FilterButton = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  border-radius: 16px;

  box-shadow: ${({ theme }) => theme.shadow.normal};

  .Submit {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 40px;
    box-shadow: none;
    border-radius: 16px 0 0 16px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      height: 16px;
      margin-right: 12px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    & + button {
      align-self: flex-end;

      height: 40px;
      width: 200px;
      padding: 4px 16px;
      transition: all 0.2s;
      border-radius: 0 16px 16px 0;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);

      color: ${({ theme }) => theme.colors.tertiary};
      background-color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        transform: scale(1.01);
      }
    }
  }
`

const Style = styled.div`
  position: relative;

  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow-y: scroll;
    border-spacing: 0px;

    th,
    td {
      padding: 8px;
      user-select: none;
    }

    thead {
      z-index: 2;

      width: 100%;
      background-color: ${({ theme }) => theme.colors.tertiary};

      tr {
        box-shadow: ${({ theme }) => theme.shadow.normal};

        th {
          cursor: pointer;
          text-align: left;
          font-weight: normal;

          .ArrowIcon {
            width: 18px;
            margin-right: 8px;

            fill: ${({ theme }) => theme.colors.secondary};
          }

          &:first-child {
            padding-left: 40px;
          }
        }
      }
    }

    tbody {
      tr {
        height: 32px;

        &:hover {
          cursor: pointer;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
        }

        &:first-child td {
          padding-top: 12px;
        }

        &:first-child:hover {
          box-shadow: ${({ theme }) => theme.shadow.normal};
        }
      }
    }
  }

  #TableRefreshIcon {
    position: absolute;
    top: 0;
    z-index: 3;

    width: 18px;
    height: 24px;
    margin-left: 8px;
    transform: translateY(25%);

    fill: ${({ theme }) => theme.colors.secondary};
  }

  #loader {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-top: 32px;
  }
`

export default Style

FilterButton.displayName = 'FilterButton-Style'
Style.displayName = 'Table-Style'
