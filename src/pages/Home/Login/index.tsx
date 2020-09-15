import React, { useRef, useEffect, useState, useCallback } from 'react'
import Style, { Content, Register, Google, Recaptcha, Permanence } from './styles'

import Loader from 'styles/Loader'

import loginSchema from 'validations/login'

import Button from 'components/Forms/Button'
import InputText from 'components/Forms/InputText/'
import Checkbox from 'components/Forms/Checkbox'
import ThemeSwitch from 'components/ThemeSwitch'
import { Atributes } from 'components/Modal'

import { useAuth } from 'hooks/useAuth'
import { useHomeSlider } from 'hooks/useHomeSlider'

import getValidationErrors from 'utils/getValidationErrors'

import google from 'assets/google.png'

import anime from 'animejs'
import ReCAPTCHA from 'react-google-recaptcha'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { useHistory, Link } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { SubmitHandler, FormHandles } from '@unform/core'

export interface LoginData {
  email: string
  password: string
  captcha: string
  remember?: boolean
}

interface LoginProps {
  setModalVisible: (Atribute: Atributes) => void
}

const Login: React.FC<LoginProps> = ({ setModalVisible }) => {
  const loginFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const loginRef = useRef(null)

  const history = useHistory()
  const { login } = useAuth()

  const { homeSlider, setHomeSlider } = useHomeSlider()
  const [showLogin, setShowLogin] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [loadingLogin, setLoadingLogin] = useState(false)

  const onRegisterClick = () => {
    setHomeSlider(true)
  }

  const onLoginSubmit: SubmitHandler<LoginData> = async (data, { reset }, event) => {
    event?.preventDefault()
    setLoadingLogin(true)

    console.log(data)

    try {
      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      await loginSchema.validate(data, { abortEarly: false })
      await login({ ...data, captcha: captchaToken as string })

      loginFormRef.current?.setErrors({})
      reset()
      setLoadingLogin(false)
      history.push('/main')
    } catch (error) {
      setLoadingLogin(false)
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        loginFormRef.current?.setErrors(errorList)
      } else {
        setModalVisible({
          visible: true,
          title: 'Erro!',
          message:
            'Verifique se o email e senha estão corretos, ou se o cadastro já foi confirmado!',
          color: '#e8423f',
        })
      }
    }
  }

  const loginAppearAnimation = () =>
    anime({
      targets: loginRef.current,
      translateX: [300, 0],
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 900,
      easing: 'easeInOutSine',
    })

  const loginSliderAnimation = useCallback(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)

    if (homeSlider) {
      setTimeout(() => {
        setShowLogin(false)
      }, 1000)
    } else setShowLogin(true)
  }, [homeSlider])

  useEffect(() => {
    loginAppearAnimation()
  }, [])

  useEffect(() => {
    loginSliderAnimation()
  }, [loginSliderAnimation])

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />

      {showLogin && (
        <Style ref={loginRef}>
          <header>
            <ThemeSwitch />
          </header>

          <Content>
            <Google>
              <img src={google} alt='google' />
              <span>Entrar com o Google</span>
            </Google>

            <Form ref={loginFormRef} onSubmit={onLoginSubmit}>
              <InputText
                name='email'
                placeholder='E-mail'
                icon={AiOutlineMail}
                iconSize='65%'
                autoComplete='email'
              />

              <InputText
                name='password'
                type='password'
                placeholder='Senha'
                icon={FiLock}
                iconSize='65%'
                eye
                autoComplete='current-password'
              />

              <Button type='submit'>
                <div>Efetuar Login</div>
                <span>{loadingLogin && <Loader size='18px' border='3px' />}</span>
              </Button>

              <Permanence>
                <Checkbox name='remember' />
                <label htmlFor='remember'>Permanecer conectado</label>
              </Permanence>
            </Form>

            <Link to='/forgot-password'>Não consegue fazer login?</Link>

            <Register>
              <span>Ainda não possui uma conta ?</span>

              <button type='button' disabled={disabled} onClick={onRegisterClick}>
                Registre-se aqui!
              </button>
            </Register>
          </Content>
        </Style>
      )}
    </>
  )
}

export default Login
