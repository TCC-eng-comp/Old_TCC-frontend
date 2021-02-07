import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import EyeClosedIcon from 'assets/Inputs/EyeClosedIcon'
import EyeIcon from 'assets/Inputs/EyeIcon'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

export interface TextProps extends React.HTMLProps<HTMLInputElement> {
  handleValue?: (value: any) => void
  eye?: boolean
  pasteAndDrop?: boolean
  icon?: React.FC
  color?: string
}

const Text = forwardRef<HTMLInputElement, TextProps>(
  (
    {
      eye = false,
      type = 'text',
      onBlur,
      handleValue,
      icon: Icon,
      pasteAndDrop = true,
      color = '#d65881',
      ...rest
    },
    ref
  ) => {
    const form = useContext<FormState | null>(FormContext)
    const textRef = useRef<HTMLInputElement>(null)
    const auxRef = (ref as React.RefObject<HTMLInputElement>) || textRef
    const [showInput, setShowInput] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
      const input = {
        inputRef: auxRef,
        setError,
        type,
      }

      form?.registerInput(input)
      return () => form?.removeInput(input)
    }, [auxRef, form, type])

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
      setIsFilled(!!auxRef.current?.value)
      setError(undefined)
    }

    const valueHandler = (e: React.FormEvent) => {
      e.preventDefault()
      handleValue && handleValue(auxRef.current?.value)
    }

    const hiddenInput = () => {
      if (eye) return showInput ? 'text' : 'password'
      return type
    }

    return (
      <Style
        className='Text'
        color={color}
        hasEye={!!eye}
        hasIcon={!!Icon}
        isFilled={isFilled}
        isErrored={!!error}
        hidden={rest.hidden}
        onFocus={() => textRef.current?.focus()}
      >
        <ErrorTooltip error={!!error} content={error} />

        {Icon && !error && (
          <div className='iconSpace'>
            <button type='button' onClick={() => textRef.current?.focus()}>
              <Icon />
            </button>
          </div>
        )}

        <input
          spellCheck='false'
          ref={ref || textRef}
          id={rest.name}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onSubmit={valueHandler}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          {...rest}
        />
        {eye &&
          (showInput ? (
            <div className='iconSpace'>
              <EyeClosedIcon onClick={() => setShowInput(false)} />
            </div>
          ) : (
            <div className='iconSpace'>
              <EyeIcon onClick={() => setShowInput(true)} />
            </div>
          ))}
      </Style>
    )
  }
)

export default Text
