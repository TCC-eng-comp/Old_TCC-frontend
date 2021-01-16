import styled from 'styled-components'

const Style = styled.button`
  position: relative;

  height: 44px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  .DotsLoader {
    position: absolute;
    right: 10%;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Style
