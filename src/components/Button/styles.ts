import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.button`
  border-width: 0px;
  border-radius: 5px 0 5px 0;
  height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('primary')};

  position: relative;

  span {
    position: absolute;
    right: 25%;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 475px) {
    span {
      right: 20%;
    }
  }
`

export default Style
