import React, { FC, HTMLProps } from 'react'

import Loader from 'components/Form/Button/Loader'

interface Props extends HTMLProps<HTMLButtonElement> {
  theme?: { [s: string]: string }
  type?: never
  _loader?: boolean
}

const Button: FC<Props> = ({ _loader, theme, children, ...rest }) => {
  return (
    <button type='submit' {...rest}>
      {children}

      {_loader && <Loader theme={theme} />}
    </button>
  )
}

export default Button