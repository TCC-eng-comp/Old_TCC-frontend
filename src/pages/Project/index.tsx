import React, { useEffect, useMemo, useRef } from 'react'

import About from './About'
import Participants from './Participants'

import api from 'services/api'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ProjectType } from 'types/Responses/project'
import { ParticipantsResType } from 'types/Responses/project/participants'
import { UniversityResType } from 'types/Responses/university'

import { useParams } from 'react-router-dom'

const Profile = () => {
  const participants = useRef<ParticipantsResType>()
  const university = useRef<UniversityResType>()
  const project = useRef<ProjectType>()
  const aboutProject = useRef(null)
  const members = useRef(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      project.current = await api.get(`project/${id}`)
      participants.current = await api.get(`university/${id}/participants`)
      university.current = await api.get(
        `api/university/${project.current?.university_id}`
      )
    })()
  }, [id])

  const profileRoutes: RouteProps[] = useMemo(
    () => [
      {
        label: 'Projeto',
        ref: aboutProject,
        icon: () => <ProjectIcon />,
        paths: [`/session/project/${id}`],
        component: () => <About ref={aboutProject} project={project.current} />
      },
      {
        ref: members,
        label: 'Participantes',
        icon: () => <ProjectIcon />,
        paths: [`/session/project/${id}/participants`],
        component: () => (
          <Participants ref={members} participants={participants.current} />
        )
      },
      {
        label: 'Voltar ao mapa',
        bottom: true,
        icon: () => <MapIcon />,
        paths: ['/session/main/map']
      }
    ],
    [id]
  )

  return <Sidebar title='Perfil' samePage={true} routes={profileRoutes} />
}

export default Profile
