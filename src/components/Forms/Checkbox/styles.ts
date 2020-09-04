import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  width: 16px;
  height: 16px;

  input,
  svg {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
  }

  input {
    z-index: 1;

    display: none;
  }
`

export default Style