import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};
`
export default Style

Style.displayName = 'Customization-Style'
