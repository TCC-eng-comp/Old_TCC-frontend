import React, { forwardRef, useContext } from 'react'
import Style, { CreateProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import Table from 'components/Table'
import { File, Select, Submit, Text, Textarea } from 'components/Form'

import { GlobalContext } from 'App'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { UniversityResType } from 'types/Responses/university'
import { ProfessorResType } from 'types/Responses/user/roles'

const Projects = forwardRef((_props, ref) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const { modalRef } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)

  const getUniversitiesOptions = async () => {
    const universitiesOfProfessor = []
    const { universities }: ProfessorResType = await api.get(
      '/user/roles/professor'
    )

    for (let i = 0; i < universities.length; i++) {
      const university = universities[i]
      const { name, id }: UniversityResType = await api.get(
        `/university/${university.id}`
      )

      universitiesOfProfessor.push({
        value: id,
        label: name
      })
    }

    return universitiesOfProfessor
  }

  modalRef?.current?.config({
    close: {
      top: 16,
      right: 16,
      color: theme.colors.tertiary
    },
    content: (
      <CreateProject schema={createProjectSchema}>
        <Select
          name='university'
          placeholder='Universidade'
          value={undefined}
          options={[
            {
              label: ':(',
              value: ';('
            }
          ]}
        />

        <Text placeholder='Título' name='title' />

        <Textarea placeholder='Resumo' name='description' />

        <File
          guides
          bottom='50vh'
          tranlateY='50%'
          name='document'
          bgHeight='200vh'
          label='Documento'
          accept='application/pdf'
          noCropper={true}
        />

        <Submit>Criar projeto</Submit>
      </CreateProject>
    )
  })

  return (
    <>
      <Style ref={ref as any}>
        <header>
          <h1>Meus projetos</h1>
        </header>

        <Table
          path='user/projects'
          isLoading={false}
          filters={{ name: true, from: true, to: true }}
          headerData={[
            { label: 'Nome', name: 'title' },
            { label: 'Status', name: 'status' }
          ]}
        />

        {user.selectedRole === 'professor' && (
          <button id='newProject' onClick={() => modalRef?.current?.toggle()}>
            Criar novo projeto
          </button>
        )}
      </Style>
    </>
  )
})

export default Projects