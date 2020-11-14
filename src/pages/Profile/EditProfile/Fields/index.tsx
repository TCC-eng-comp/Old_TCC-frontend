import React, { FC, memo, useContext } from 'react'

import Field from './Field'
import { ModalContext } from '../'

import formatUpdateUser, { Info } from 'utils/formatUpdateUser'

import { RootState, UserState, useSelector } from 'store'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'

interface Props {
  theme: any
}

const Fields: FC<Props> = ({ theme }) => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const modal = useContext(ModalContext)

  return (
    <Slider width={550} gap={200} gapVertical={100}>
      <Card key='Personal' headerText='Dados Pessoais'>
        <Avatar
          size={128}
          onClickInShadow={() => modal?.setShow(true)}
          loaderColor='#DB7093'
          shadow
        />

        {formatUpdateUser(user, user.role === 'baseUser' ? 'baseUser' : 'user').map(
          (info: Info) => (
            <Field key={info.inputname} theme={theme} data={info} />
          )
        )}
      </Card>

      <Card key='Student' headerText='Dados de Estudante'>
        {formatUpdateUser(user, 'student').map((info: Info) => (
          <Field key={info.inputname} theme={theme} data={info} />
        ))}
      </Card>
    </Slider>
  )
}

export default memo(Fields)