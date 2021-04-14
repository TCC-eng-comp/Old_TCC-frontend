import { University } from 'store/AsyncThunks/universities'
import { UserState } from 'store/user'

export interface InputData {
  label: string
  value: string | number
  name: string
  editable: boolean
  date?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  personal: InputData[]
  moderator: InputData[]
  guest: InputData[]
  student: InputData[]
  professor: InputData[]
}

const removeRepeatly = (array: any[]) =>
  array.filter((current, index) => array.indexOf(current) === index)

const formatUpdateUser = (
  universities: University[],
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const getUniversityName = (id: number) => {
    const university = universities.find(
      university => university.university_id === id
    )

    return university ? university.name : ''
  }

  const getEmail = (role: 'student' | 'professor'): InputData[] => {
    const fields = []

    const getUniversityRegex = (id: number) => {
      const university = universities.find(
        university => university.university_id === id
      )

      return university ? university.regex.email[role] : ''
    }

    const institucionalUniversities = removeRepeatly(
      userData.emails
        .filter(current => current.institutional === true)
        .map(({ address, university_id }) => ({
          address,
          university_id
        }))
    )

    const userUniversities = institucionalUniversities.map(
      ({ university_id, address }) => ({
        address,
        regex: getUniversityRegex(university_id),
        universityName: getUniversityName(university_id)
      })
    )

    for (let i = 0; i < userUniversities.length; i++) {
      const regex = new RegExp(userUniversities[i].regex)

      fields.push({
        label: 'Universidade:',
        name: 'university_id',
        value: userUniversities[i].universityName,
        editable: false
      })

      if (regex.test(userUniversities[i].address))
        fields.push({
          label: 'Email:',
          name: 'inst_email',
          value: userUniversities[i].address,
          editable: false
        })
    }

    return fields
  }

  const guest: InputData[] = [
    {
      label: 'Nome:',
      name: 'name',
      value: userData.name,
      editable: true
    },
    {
      label: 'Sobrenome:',
      name: 'surname',
      value: userData.surname,
      editable: true
    }
  ]

  const personal: InputData[] = [
    {
      label: 'Nome:',
      name: 'name',
      value: userData.name,
      editable: true
    },
    {
      label: 'Sobrenome:',
      name: 'surname',
      value: userData.surname,
      editable: true
    },
    {
      label: 'Nascimento:',
      name: 'birthday',
      value: userData.birthday,
      date: true,
      editable: true
    },
    {
      label: 'Nova senha:',
      name: 'new_password',
      value: '',
      dontShow: true,
      editable: true
    },
    // {
    //   label: 'Confirmar nova senha:',
    //   name: 'new_password',
    //   value: '',
    //   dontShow: true,
    //   editable: true
    // },
    {
      label: 'E-mail:',
      name: 'email',
      value: userData.emails[0].address,
      editable: false
    }
    // {
    //   label: 'Celular:',
    //   name: 'phone',
    //   value: userData.phone ? '' : userData.phone,
    //   date: true,
    //   editable: true
    // }
  ]

  const student: InputData[] = [
    ...getEmail('student'),
    {
      label: 'Linkedin:',
      name: 'linkedin',
      value: userData.student?.linkedin || '',
      editable: true
    },
    {
      label: 'Lattes:',
      name: 'lattes',
      value: userData.student?.lattes || '',
      editable: true
    },
    {
      label: 'Semestre:',
      name: 'semester',
      value: userData.student?.universities
        ? `${userData.student.universities[0].semester}° Semestre`
        : '',
      editable: true
    }
  ]

  const professor: InputData[] = [
    ...getEmail('professor'),
    {
      label: 'Linkedin:',
      name: 'linkedin',
      value: userData.professor?.linkedin || '',
      editable: true
    },
    {
      label: 'Lattes:',
      name: 'lattes',
      value: userData.professor?.lattes || '',
      editable: true
    },
    {
      label: 'Orcid:',
      name: 'orcid',
      value: userData.professor?.orcid || '',
      editable: true
    },
    {
      label: 'Pós-graduação:',
      name: 'postgraduate',
      value: userData.professor?.postgraduate || '',
      editable: true
    },
    {
      label: 'Tempo integral:',
      name: 'full_time',
      value: userData.professor?.universities
        ? userData.professor?.universities[0].full_time
          ? 'Sim'
          : 'Não'
        : '',
      editable: true
    }
  ]

  const moderator: InputData[] = [
    {
      label: 'Universidade',
      name: 'university',
      value:
        (userData.moderator &&
          userData.moderator.universities &&
          getUniversityName(
            userData.moderator.universities[0].university_id
          )) ||
        '',
      editable: true
    }
  ]

  const formInputs: ContainerForm = {
    personal,
    moderator,
    professor,
    guest,
    student
  }

  return formInputs[role]
}

export default formatUpdateUser
