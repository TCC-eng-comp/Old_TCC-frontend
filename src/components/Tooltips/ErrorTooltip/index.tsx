import React from 'react'
import Style, { Trigger } from './styles'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { PopupProps } from 'semantic-ui-react'

interface ErrorTooltipProps extends PopupProps {
  error: boolean
}

const ErrorTooltip = ({ error, ...props }: ErrorTooltipProps) => {
  return error ? (
    <Style
      position='top left'
      className='ErrorTooltip'
      trigger={
        <Trigger className='Trigger' data-cy='Tooltip-error'>
          <AlertIcon />
        </Trigger>
      }
      {...props}
    />
  ) : (
    <></>
  )
}

export default ErrorTooltip
