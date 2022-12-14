import Form from 'components/Form'

import styled from 'styled-components'

export const CreateProject = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 500px;
  border-radius: 16px;
  padding: 48px 24px 24px 24px;

  background-color: ${({ theme }) => theme.colors.secondary};

  > * {
    width: 100%;

    & + * {
      margin-top: 24px;
    }
  }
`

export const NewProject = styled.button`
  position: absolute;
  left: 50%;
  bottom: 24px;

  width: 90%;
  height: 48px;
  border-radius: 16px;
  transform: translateX(-50%);

  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadow.normal};
  background-color: ${({ theme }) => theme.colors.primary};
`

const Style = styled.section`
  position: relative;

  .TableFilters {
    padding: 24px;

    .Text {
      margin-bottom: 24px;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 24px;
    text-align: center;
    width: max(100%, 280px);
  }
`
export default Style

Style.displayName = 'Projects-Style'
