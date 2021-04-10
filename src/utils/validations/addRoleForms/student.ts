import * as Yup from 'yup'

const ambiguous = (recievedRegister: string) => {
  const register = new RegExp(recievedRegister)

  return {
    lattes: Yup.string(),
    linkedin: Yup.string(),
    university_id: Yup.number().required('Você precisa selecionar!'),
    campus_id: Yup.number().required('Você precisa selecionar!'),
    course_id: Yup.number().required('Você precisa selecionar!'),
    semester: Yup.number().required('Você precisa selecionar!'),
    register: Yup.string().matches(register)
  }
}

export const emailSchema = (register: string) =>
  Yup.object({ ...ambiguous(register) })

export const voucherSchema = (register: string) =>
  Yup.object({
    ...ambiguous(register),
    voucher: Yup.string().required('Você precisa selecionar um comprovante!')
  })
