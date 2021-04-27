import styled from 'styled-components'

export const Content = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 16px;
  border-radius: 10px;
  width: min(90%, 500px);

  box-shadow: -8px 8px 10px -4px rgba(0, 0, 0, 0.49);
  background: ${({ theme }) => theme.colors.secondary};

  p {
    margin: 0;
    text-align: center;
  }

  form {
    width: 100%;

    p,
    .Submit {
      margin-top: 16px;
    }

    .Text {
      margin-top: 8px;
    }

    .Submit {
      width: 100%;
      height: 44px;
      transition: all 0.2s;
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};

  .BackButton {
    position: absolute;
    top: 24px;
    left: 32px;

    transition: all 0.2s;

    color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default Style

Content.displayName = 'Content-Style'
Style.displayName = 'ResetPassword-Style'
