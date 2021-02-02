import React, { FC, FormEvent, HTMLProps, ReactElement, useRef, useState } from 'react'
import { captcha as Captcha, ReCaptcha } from './styles'

import { FormProvider, Ref } from './FormContext'

import api from 'services/api'

import { useHistory } from 'react-router-dom'
import { ObjectSchema, ValidationError } from 'yup'

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: (ReactElement | ReactElement[])[] | ReactElement
  path: string
  push?: string
  captcha?: boolean
  loading?: boolean
  valSchema?: ObjectSchema
  addData?: { [key: string]: string }
  handleData?: (data: any) => void
  callback?: (resData: any) => void
}

/**
 *
 * @param children -must have an input
 */

const Form: FC<FormProps> = ({
  children,
  path,
  push,
  loading,
  valSchema,
  handleData,
  addData,
  captcha,
  callback,
  ...rest
}) => {
  const data: any = { ...addData }
  let refs: Ref[] = []
  let haveErrors = false

  const recaptchaRef = useRef<Captcha>(null)
  const [showLoader, setShowLoader] = useState(false)
  const history = useHistory()

  const setRef = (input: Ref) => {
    refs.push(input)
  }

  const removeRef = (input: Ref) => {
    const index = refs.findIndex(value => value === input)
    const newArray = refs.filter((_, i) => i !== index)
    refs = newArray
  }

  const setData = () => {
    refs.forEach(ref => {
      if (!ref.input.current) throw new Error('Form setData error!')

      data[ref.input.current.name] =
        ref.input.current?.type === 'checkbox'
          ? ref.input.current?.checked
          : ref.input.current?.value
    })
  }

  const validate = () => {
    try {
      valSchema && valSchema.validateSync(data, { abortEarly: false })
    } catch (error) {
      haveErrors = true

      if (error instanceof ValidationError) {
        error.inner.forEach(errorElement => {
          const index = refs.findIndex(value => value.input.current?.name === errorElement.path)
          refs[index].setError(errorElement.message)
        })
      } else {
        throw new Error('unexpected error on validation!')
      }
    }
  }

  const submit = async (cb?: (data: any) => void) => {
    const resData = await api.post(path, data)
    console.log(resData)
    cb && cb(resData)

    return resData.success
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    loading && setShowLoader(true)

    setData()
    handleData && handleData(data)
    validate()

    if (captcha) data.captcha = (await recaptchaRef.current?.executeAsync()) ?? false
    const submitRes = !haveErrors && (await submit(callback))

    loading && setShowLoader(false)

    !haveErrors && push && submitRes && history.push(push)
  }

  return (
    <form onSubmit={handleSubmit} noValidate {...rest}>
      {captcha && (
        <ReCaptcha
          ref={recaptchaRef}
          size='invisible'
          sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
        />
      )}

      <FormProvider value={{ removeRef, setRef, loader: showLoader }}>{children}</FormProvider>
    </form>
  )
}

export default Form
