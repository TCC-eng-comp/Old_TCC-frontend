import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.li)`
  width: clamp(300px, 60vw, 600px);

  #universityName {
    position: relative;
    z-index: 3;

    width: 100%;
    height: 72px;
    font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }

  #seasons {
    padding: 24px;
    border-radius: 0px 0px 16px 16px;

    color: ${({ theme }) => theme.colors.tertiary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  #noSeasons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Style