import React, { useState } from 'react'

import Style from '../styles'

import Modal, { ModalAttributes } from 'pages/ForgotPassword/Modal'

import { passwordSchema } from 'utils/validations/forgotPassword'

import PadlockIcon from 'assets/Inputs/PadlockIcon'

import Logo from 'components/Logo'
import { Form, Submit, Text } from 'components/Form'

import { useHistory } from 'react-router-dom'

const ConfirmPassword: React.FC = () => {
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({
    visible: false,
  })

  const history = useHistory()

  const path = window.location.pathname.split('/')

  const token = path[2] || localStorage.getItem('reset-password-token')
  if (!token) throw new Error('No token provided')

  const handleModalOKClick = () => {
    setModalAttributes({ visible: false })
    history.push('/')
  }

  const handleResetPassSubmit = () => {
    setModalAttributes({
      visible: true,
      title: 'Sucesso',
      message: 'Senha Alterada',
      color: '#13c47c',
    })
  }

  return (
    <>
      <Modal {...modalAttributes} onOKClick={handleModalOKClick} />
      <Style>
        <article>
          <header>
            <Logo />
          </header>

          <section>
            <Form
              afterResData={handleResetPassSubmit}
              schema={passwordSchema}
              path='reset-password'
              addData={{ token }}
              loading
              captcha
            >
              <h2>Digite sua nova senha</h2>

              <Text name='password' type='password' placeholder='Senha' icon={PadlockIcon} eye />

              <h2>Confirme sua nova senha</h2>

              <Text
                name='confirmPassword'
                type='password'
                placeholder='Confirmar senha'
                icon={PadlockIcon}
                eye
              />

              <Submit className='submit'>Redefinir</Submit>
            </Form>
          </section>
        </article>
      </Style>
    </>
  )
}

export default ConfirmPassword
