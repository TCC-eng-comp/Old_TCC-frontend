/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useRef, useState } from 'react'
import Style, { Change, Label, Value } from './styles'

import { Info } from 'utils/formatUpdateUser'

import editPencil from 'assets/editPencil.svg'
import close from 'assets/close.svg'

import { Input, InputDate } from 'components/Form'

interface Props {
  theme: any
  data: Info
}

const Field: FC<Props> = ({ theme, data }) => {
  const [change, setChange] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const inputDateValue = (value: string) => {
    const old = value.split('-')
    return old[0] ? `${old[2]}/${old[1]}/${old[0]}` : ''
  }

  useEffect(() => {
    if (change) inputRef.current?.focus()
  }, [change])

  const input =
    data.inputname === 'birthday' ? (
      <InputDate name={data.inputname} value={`${inputDateValue(data.value as string)}`} noStyle />
    ) : (
      <Input
        ref={inputRef}
        name={data.inputname}
        placeholder={data.dontShow ? `*********` : ''}
        defaultValue={data.dontShow ? '' : data.value}
        noStyle
      />
    )

  return (
    <Style key={data.inputname} theme={theme}>
      <Label>
        <span>{data.label}</span>
      </Label>

      <Value>
        {change ? (
          input
        ) : (
          <span onClick={() => setChange(true)}>
            {data.inputname === 'birthday' ? inputDateValue(data.value as string) : data.value}
          </span>
        )}
      </Value>

      <Change>
        <label htmlFor={change ? data.inputname : undefined}>
          <img src={change ? close : editPencil} alt='edit' onClick={() => setChange(!change)} />
        </label>
      </Change>
    </Style>
  )
}

export default Field
