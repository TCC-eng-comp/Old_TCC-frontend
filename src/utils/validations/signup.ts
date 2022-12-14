import * as Yup from 'yup'

const signupSchema = Yup.object({
  name: Yup.string()
    .matches(/^([A-zÀ-ú]\s?)+$/, 'Informe um nome válido!')
    .required('Você precisa informar seu nome!'),

  surname: Yup.string()
    .matches(/^([A-zÀ-ú]\s?)+$/, 'Informe um sobrenome válido!')
    .required('Você precisa informar seu sobrenome!'),

  email: Yup.string()
    .email('E-mail inválido!')
    .matches(/^(\w\.?)+@(\w\.?)+\.(\w\.?)+$/, 'E-mail inválido!')
    .required('É necessário informar o e-mail!'),

  birthday: Yup.string().required('É necessário informar a data!'),

  password: Yup.string()
    .matches(/^(?=.*[@$!%*?&])/, 'Sua senha deve conter um caractere especial.')
    .matches(/^(?=.*[A-Z])/, 'Sua senha deve conter uma letra maiúscula.')
    .matches(/^(?=.*[a-z])/, 'Sua senha deve conter uma letra minúscula.')
    .matches(/^(?=.*\d)/, 'Sua senha deve conter um número.')
    .min(8, 'Sua senha deve conter mais que 8 caracteres.')
    .required('Você precisa de uma senha!'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não se correspondem.')
    .required('Você precisa confirmar sua senha!')
})

export default signupSchema
