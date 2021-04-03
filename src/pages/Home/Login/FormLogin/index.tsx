import React, { useState } from 'react'
import Style, { Form, LoginFailed } from './styles'

import loginSchema from 'utils/validations/login'

import { HomeActions } from 'store/home'

import MailIcon from 'assets/Inputs/MailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import AlertIcon from 'assets/Inputs/AlertIcon'
import Logo from 'assets/Logo'

import { Checkbox, Submit, Text } from 'components/Form'
import ThemeSwitch from 'components/ThemeSwitch'

import { AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

export interface LoginData {
  email: string
  password: string
  captcha: string
  remember?: boolean
}

const FormLogin = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)
  const [loginFailed, setLoginFailed] = useState('')

  const onSubmit = (resData: any) => {
    if (resData.success)
      localStorage.setItem('@SLab_ac_token', resData.access_token)
    else {
      setLoginFailed(
        resData.error === 'Incorrect password!'
          ? 'Senha incorreta, tente novamente'
          : 'E-mail não encontrado'
      )

      setTimeout(() => setLoginFailed(''), 9000)
    }
  }

  const onRegisterClick = () => {
    setDisable(true)
    dispatch(HomeActions.update({ initial: true }))
    dispatch(HomeActions.update({ page: 'signup' }))
    history.push('/home/signup')
  }

  return (
    <Style>
      <ThemeSwitch />

      <Form
        afterResData={onSubmit}
        schema={loginSchema}
        path='login'
        push='/session/main'
        loading
        captcha
      >
        <Logo />

        <AnimatePresence>
          {loginFailed !== '' && (
            <div id='fail'>
              <LoginFailed
                animate={{ x: ['-10%', '0%'], opacity: [0, 1] }}
                exit={{ x: '-10%', opacity: [1, 0] }}
                transition={{ type: 'tween', duration: 0.7 }}
              >
                <AlertIcon />

                <p>{loginFailed}</p>
              </LoginFailed>
            </div>
          )}
        </AnimatePresence>

        <Text
          name='email'
          placeholder='E-mail'
          autoComplete='email'
          data-cy='input-login-email'
          icon={MailIcon}
        />

        <Text
          eye
          name='password'
          type='password'
          placeholder='Senha'
          data-cy='input-login-password'
          autoComplete='current-password'
          icon={PadlockIcon}
        />

        <div id='submit'>
          <Link
            to='/forgot-password'
            onClick={() => dispatch(HomeActions.update({ initial: false }))}
          >
            Não consegue fazer login?
          </Link>

          <Submit data-cy='button-login-submit'>Efetuar Login</Submit>
        </div>

        <div id='footer'>
          <Checkbox name='remember' label='Permanecer conectado' />

          <div id='register'>
            Ainda não possui uma conta ?
            <button
              type='button'
              data-cy='button-login-register'
              onClick={onRegisterClick}
              disabled={disable}
            >
              Registre-se aqui!
            </button>
          </div>
        </div>
      </Form>
    </Style>
  )
}

export default FormLogin
