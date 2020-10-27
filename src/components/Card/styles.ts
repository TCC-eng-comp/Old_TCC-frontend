import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 60px 20px 20px 20px;
  border-radius: 16px;

  background-color: white;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.8);
`

export const Header = styled.header`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: #ff6d8d;
  color: white;
`

export default Style

Style.displayName = 'Card-Style'
Header.displayName = 'Header-Style'
