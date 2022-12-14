import styled from 'styled-components'

export const LoginFailure = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  color: ${({ theme }) => theme.colors.red};

  span {
    font-size: clamp(1.4rem, 0.6rem + 2.6vw, 1.8rem);
  }

  .Icon {
    width: 24px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.red};
  }
`

export const Register = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding-top: 8px;

  border-top: solid 2px ${({ theme }) => theme.colors.tertiary};

  span,
  button {
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);
  }

  button {
    color: ${({ theme }) => theme.colors.primary};

    &:hover,
    &:focus {
      transform: scale(1.01);
      filter: brightness(1.1);
    }
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: clamp(284px, 70%, 530px);
  padding: 24 0px;

  > * {
    width: 100%;
  }

  header {
    height: clamp(94px, 25vw, 130px);

    .FullLogo {
      height: 100%;
    }
  }

  .Form {
    margin: 16px 0 8px 0;

    > *:not(:last-child) {
      margin-bottom: 16px;
    }

    #submit {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      a {
        margin-bottom: 4px;
        align-self: flex-end;
      }

      .Submit {
        width: 100%;
      }
    }
  }

  @media screen and (min-height: 600px) {
    padding: 0px;
  }

  @media screen and (min-width: 1200px) {
    header {
      height: 25%;
    }
  }
`
const Style = styled.aside`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 100vh;

  box-shadow: ${({ theme }) => theme.shadow.invertedNormal};
  background-color: ${({ theme }) => theme.colors.secondary};

  .ThemeSwitch {
    position: absolute;
    top: 24px;
    right: 24px;

    height: 32px;
  }

  @media screen and (min-width: 1200px) {
    width: 38vw;
    border-radius: 20px 0 0 20px;
  }
`

export default Style

LoginFailure.displayName = 'LoginFailure-Style'
Register.displayName = 'Register-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'Aside-Style'
