import React, { useEffect, useState } from 'react'
import Form from './styles'

import Container from '../Container'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'

import { AnimatePresence, motion, Variants } from 'framer-motion'

const emailSize = 35
const receiptSize = 88

const semesterOptions = [
  { value: 'first', label: '1° Semestre' },
  { value: 'second', label: '2° Semestre' },
  { value: 'third', label: '3° Semestre' },
  { value: 'room', label: '4° Semestre' },
  { value: 'fifth', label: '5° Semestre' },
  { value: 'sixth', label: '6° Semestre' },
  { value: 'seventh', label: '7° Semestre' },
  { value: 'eighth', label: '8° Semestre' },
  { value: 'ninth', label: '9° Semestre' },
  { value: 'tenth', label: '10° Semestre' }
]

const inputs: Variants = {
  initial: { height: 0 },
  email: { height: emailSize },
  receipt: { height: receiptSize }
}

const StudentForm = () => {
  const [wayOfSignup, setWayOfSignup] = useState<
    undefined | 'email' | 'receipt'
  >(undefined)
  const [universitiesData, setUniversity] = useState()
  const [campusData, setCampus] = useState()
  const [courseData, setCourse] = useState()

  const method: Variants = {
    initial: {
      opacity: 0,
      height: 0
    },
    open: {
      opacity: 1,
      x: wayOfSignup === 'email' ? [-300, 0] : [300, 0],
      transition: {
        type: 'tween',
        duration: 0.4
      }
    },
    closed: {
      opacity: 0,
      x: wayOfSignup === 'email' ? [0, -300] : [0, 300],
      transition: {
        type: 'tween',
        duration: 0.2
      }
    }
  }

  useEffect(() => {
    const getSelectsData = async () => {
      const response = await api.get('/universities')
      const { universities } = response

      const formatterUniversities = universities.map((university: any) => ({
        value: university.name,
        label: university.name
      }))
      setUniversity(formatterUniversities)

      const { campus } = await api.get('university/1/campus')
      const formatterCampus = campus.map((campus: any) => ({
        value: campus.name,
        label: campus.name
      }))
      setCampus(formatterCampus)

      const { courses } = await api.get('/university/campus/1/course')
      const formatterCourses = courses.map((courses: any) => ({
        value: courses,
        label: courses
      }))
      setCourse(formatterCourses)
    }

    getSelectsData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }, [])

  return (
    <Container role='student'>
      <Form
        path='user/addRole/student'
        getData={e => console.log(e)}
        schema={wayOfSignup === 'email' ? emailSchema : receiptSchema}
        addData={{ role: 'student' }}
        loading
      >
        <Select
          name='university'
          placeholder='Universidade'
          options={universitiesData}
        />

        <Select name='campus' placeholder='Câmpus' options={campusData} />

        <Select name='course' placeholder='Curso' options={courseData} />

        <Select
          name='semester'
          placeholder='Semestre'
          options={semesterOptions}
        />

        <div id='ways'>
          <span id='label'>Forma de registro</span>

          <div id='buttons'>
            <button type='button' onClick={() => setWayOfSignup('email')}>
              E-mail institucional
            </button>

            <button type='button' onClick={() => setWayOfSignup('receipt')}>
              Enviar comprovante
            </button>
          </div>

          <motion.div
            id='inputs'
            initial='initial'
            variants={inputs}
            animate={wayOfSignup}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <AnimatePresence>
              {wayOfSignup === 'email' && (
                <motion.div variants={method} exit='closed' animate='open'>
                  <Text name='email' placeholder='E-mail institucional' />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {wayOfSignup === 'receipt' && (
                <motion.div
                  id='receipt'
                  variants={method}
                  exit='closed'
                  animate='open'
                >
                  <div id='warning'>
                    <AlertIcon />

                    <div>
                      Este processo é mais lento pois requer confirmação de um{' '}
                      <b>Moderador</b> de sua universidade.
                    </div>
                  </div>

                  <File guides name='receipt' label='Enviar comprovante' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Submit id='submit' disabled={wayOfSignup === undefined}>
          Enviar solicitação
        </Submit>
      </Form>
    </Container>
  )
}

export default StudentForm
