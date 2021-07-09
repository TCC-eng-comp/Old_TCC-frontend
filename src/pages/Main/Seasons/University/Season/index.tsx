import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Style, { Content } from './styles'

import DatesTable from './DatesTable'

import transition from 'utils/transition'

import ArrowIcon from 'assets/global/ArrowIcon'
import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'

import Field from 'components/Field'
import { File, Submit, Textarea } from 'components/Form'

import { motion, Variants } from 'framer-motion'
import { SeasonResType } from 'types/Responses/university/seasons'

interface SeasonProps {
  id: string
  isAdmin: boolean
  season: SeasonResType
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const arrowAnimation: Variants = {
  down: { rotate: 0 },
  initial: { rotate: 0 },
  right: { rotate: -90 }
}

const titleAnimation: Variants = {
  initial: { borderRadius: '16px 16px 16px 16px' },
  unrounded: { borderRadius: '16px 16px 0px 0px', transition },
  rounded: {
    borderRadius: '16px 16px 16px 16px',
    transition: { ...transition, delay: 0.3 }
  }
}

const contentAnimation: Variants = {
  initial: { height: 0, opacity: 0, overflow: 'hidden' },
  exit: { height: 0, opacity: 0, overflow: 'hidden', transition },
  enter: {
    overflow: 'visible',
    opacity: 1,
    height: 'auto',
    transition: { ...transition, delay: 0.1 }
  }
}

const Season = ({
  id,
  selecteds,
  isAdmin,
  setSelecteds,
  season: { title, description, begin, edict, periods }
}: SeasonProps) => {
  const [disabled, setDisabled] = useState(false)

  const isSelected =
    selecteds?.find(season_id => season_id === id) !== undefined

  const onTitleClick = () => {
    setSelecteds &&
      setSelecteds(prev => {
        if (isSelected) return prev?.filter(currPrev => currPrev !== id)
        return prev ? [...prev, id] : [id]
      })
  }

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => setDisabled(false), 400)
  }, [isSelected])

  return (
    <Style>
      <motion.button
        type='button'
        id='seasonTitle'
        initial='initial'
        disabled={disabled}
        onClick={onTitleClick}
        variants={titleAnimation}
        animate={isSelected ? 'unrounded' : 'rounded'}
      >
        <ArrowIcon
          initial='initial'
          variants={arrowAnimation}
          animate={isSelected ? 'down' : 'right'}
        />

        <span>{title}</span>
      </motion.button>

      <Content condition={isSelected} variants={contentAnimation}>
        {isAdmin ? (
          <Textarea
            name='description'
            placeholder='Descrição'
            defaultValue={description}
          />
        ) : (
          <p>{description}</p>
        )}

        {isAdmin ? (
          <div id='beginDatepicker'>
            <div id='label'> Início da temporada:</div>

            <Field
              icon={CalendarIcon}
              enableEdit={isAdmin}
              defaultValue={begin}
              inputType='datepicker'
              datepickerProps={{
                name: 'begin',
                placeholder: 'Duração em dias'
              }}
            />
          </div>
        ) : (
          <div id='beginDate'>Início da temporada: {begin}</div>
        )}

        <DatesTable isAdmin={isAdmin} periods={periods} />

        {isAdmin ? (
          <>
            <File name='edict' label='Enviar Edital' />

            <Submit>Salvar alterações</Submit>
          </>
        ) : (
          <a download href={edict} id='edict'>
            <DownloadIcon /> Baixar edital
          </a>
        )}
      </Content>
    </Style>
  )
}

export default Season