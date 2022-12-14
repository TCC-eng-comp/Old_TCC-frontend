import styled from 'styled-components'

export const NotLinked = styled.div`
  padding: 24px;
  text-align: center;
  border-radius: 8px;

  box-shadow: ${({ theme }) => theme.shadow.normal};
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 93px;

  > * + * {
    margin-top: 24px;
  }
`

const Style = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  padding-bottom: 48px;

  header {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    padding: 24px;
    width: max(100%, 280px);
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 32px;
      justify-content: flex-start;
    }
  }

  @media screen and (min-width: 1000px) {
    header {
      justify-content: center;
    }
  }
`

export default Style

NotLinked.displayName = 'NotLinked-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'Seasons-Style'
