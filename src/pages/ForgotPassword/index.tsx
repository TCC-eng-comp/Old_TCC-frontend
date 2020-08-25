import React, { useState, useRef } from 'react'

import { Form } from '@unform/web'

import { FiUser, FiLock } from 'react-icons/fi'

import { useHistory } from 'react-router-dom'

import { SubmitHandler, FormHandles } from '@unform/core'

import * as Yup from 'yup'

import { emailSchema } from 'validations/forgotPassword'

import getValidationErrors from 'utils/getValidationErrors'

import { ErrorTooltip } from 'components/Tooltips/index'

import api from 'services/api'

import Logo from '../../assets/Logo'

import InputText from '../../components/InputText'

import Loader from '../../styles/Loader'

import { Style, Container, InputBlock, ConfirmToken, Button } from './styles'

interface Email {
  email: string
}

interface Token {
  token: string
}

const ForgotPassword: React.FC = () => {
  const [tokenIsSend, setTokenIsSend] = useState(false)

  const [confirmToken, setConfirmToken] = useState(false)

  const emailRef = useRef<FormHandles>(null)

  const history = useHistory()

  const handleEmailSubmit: SubmitHandler<Email> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      await emailSchema.validate(data, { abortEarly: false })

      emailRef.current?.setErrors({})

      await api.post('forgot-password', data)

      setTokenIsSend(true)

      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)

        emailRef.current?.setErrors(errorList)
      }
    }
  }

  const handleTokenSubmit: SubmitHandler<Token> = async (data, { reset }, event) => {
    event?.preventDefault()

    setConfirmToken(true)

    try {
      await api.post('reset-password', data)

      localStorage.setItem('reset-password-token', data.token)

      setConfirmToken(false)

      history.push('/reset-password')
    } catch (error) {
      setConfirmToken(false)

      console.log(error)
    }
  }

  return (
    <Style>
      <Container>
        <header>
          <Logo />
        </header>

        {tokenIsSend ? (
          <ConfirmToken>
            <Form onSubmit={handleTokenSubmit}>
              <h3>Confirme o código enviado para o seu email</h3>

              <InputText name='token' placeholder='Código' icon={FiLock} />

              <div className='reSendContainer'>
                <button className='reSend' type='button'>
                  Envie novamente
                </button>
              </div>

              <Button type='submit'>
                Confirmar
                {confirmToken && (
                  <span>
                    <Loader size='18px' border='3px' />
                  </span>
                )}
              </Button>
            </Form>
          </ConfirmToken>
        ) : (
          <InputBlock>
            <Form onSubmit={handleEmailSubmit} ref={emailRef}>
              <h3>Digite seu email para recuperar a senha</h3>

              <InputText name='email' placeholder='E-mail' icon={FiUser} iconSize='65%' />

              <p>
                Enviaremos uma email para o seguinte endereço contendo instruções para renovação da
                senha
              </p>

              <Button type='submit'>Enviar</Button>
            </Form>
          </InputBlock>
        )}
      </Container>
    </Style>
  )
}

export default ForgotPassword
