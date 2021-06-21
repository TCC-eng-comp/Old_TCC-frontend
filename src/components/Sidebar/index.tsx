import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Content, ListItem, SidebarNav } from './styles'

import { SidebarActions } from 'store/Sync/sidebar'
import { RootState } from 'store'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Hamburger from 'components/Hamburger'
import Presence from 'components/Presence'

import { GlobalContext } from 'App'
import { Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router-dom'

export interface RouteProps {
  label: string
  paths: string[]
  exact?: boolean
  bottom?: boolean
  noContentMove?: boolean
  ref?: RefObject<HTMLDivElement>
  icon?: () => JSX.Element
  component?: () => JSX.Element
}

interface SidebarProps {
  letters: string
  selected: string
  background: string
  routes: RouteProps[]
  title?: string
  width?: number
  samePage?: boolean
  closedWidth?: number
  scrollBarSize?: number
}

const motionTitle: Variants = {
  initial: {
    opacity: 0,
    x: -24
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  closed: {
    opacity: 0,
    x: -24,
    transition: {
      type: 'tween',
      duration: 0.1
    }
  }
}

const Sidebar = ({
  routes,
  letters,
  selected,
  background,
  title = '',
  width = 210,
  closedWidth = 72,
  samePage = false
}: SidebarProps) => {
  const open = useSelector<RootState, boolean>(({ sidebar }) => sidebar.open)
  const { overflow } = useContext(GlobalContext)

  const { innerWidth } = useWindowDimensions()
  const [isLarge, setisLarge] = useState(innerWidth >= 545)

  const burgerRef = useRef<any>(null)

  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const normalRoutes = routes.filter(route => !route.bottom)
  const bottomRoutes = routes.filter(route => route.bottom)

  console.log(normalRoutes)

  const contentSize = (): string => {
    if (!samePage) {
      if (open) return isLarge ? `calc(100vw - ${width}px)` : '100vw'
      return isLarge ? `calc(100vw - ${closedWidth}px)` : '100vw'
    }

    if (open) return isLarge ? `calc(100vw - ${width}px - 16px)` : '100vw'
    return isLarge ? `calc(100vw - ${closedWidth}px - 16px)` : '100vw'
  }

  const content: Variants = {
    open: {
      x: isLarge ? width : 0,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.31
      }
    },
    closed: {
      x: isLarge ? closedWidth : 0,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.19
      }
    }
  }

  const motionBackground: Variants = {
    open: {
      height: '100vh',
      width: isLarge ? width : '100vw',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    closed: {
      height: isLarge ? '100vh' : closedWidth,
      width: isLarge ? closedWidth : '100vw',
      opacity: isLarge ? 1 : 0.95,
      transition: {
        type: 'tween',
        duration: 0.2
      }
    }
  }

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  useEffect(() => {
    setisLarge(innerWidth >= 545)
  }, [innerWidth])

  useEffect(() => {
    dispatch(SidebarActions.toggleSidebar(true))

    setTimeout(() => {
      dispatch(SidebarActions.toggleSidebar(false))
    }, 1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLarge])

  useEffect(() => {
    const route = routes.find(({ paths }) =>
      paths.find(path => path === pathname)
    )

    setTimeout(
      () => route?.ref?.current?.scrollIntoView({ behavior: 'smooth' }),
      1
    )
  }, [pathname, routes, overflow])

  return (
    <Style draggable='false'>
      <SidebarNav
        isOpen={open}
        letters={letters}
        background={background}
        variants={motionBackground}
        animate={open ? 'open' : 'closed'}
        initial={!isLarge ? 'open' : 'closed'}
      >
        <div id='header'>
          <Hamburger
            state={open}
            ref={burgerRef}
            color={letters}
            toggle={onToggle}
          />

          <Presence
            id='title'
            initial='initial'
            condition={open}
            variants={motionTitle}
          >
            <>{title}</>
          </Presence>
        </div>

        <ul>
          {normalRoutes.map(({ paths, ref, icon: Icon, label }, index) => (
            <ListItem
              isOpen={open}
              key={paths[0]}
              itemPaths={paths}
              selected={selected}
              pathname={pathname}
              onClick={() => {
                history.push(paths[0])
                !isLarge && dispatch(SidebarActions.toggleSidebar(!open))
                ref?.current?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {Icon && (
                <div className='icon'>
                  <Icon />
                </div>
              )}

              <Presence
                condition={open}
                className='label'
                initial={{
                  opacity: 0,
                  x: -24
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: 'tween',
                    duration: 0.4,
                    delay: 0.1 * index
                  }
                }}
                exit={{
                  x: -24,
                  opacity: 0,
                  transition: {
                    type: 'tween',
                    duration: 0.1
                  }
                }}
              >
                {label}
              </Presence>
            </ListItem>
          ))}
        </ul>

        <ul id='bottomRoutes'>
          {bottomRoutes.map(({ paths, ref, icon: Icon, label }, index) => (
            <ListItem
              isOpen={open}
              key={paths[0]}
              itemPaths={paths}
              selected={selected}
              pathname={pathname}
              onClick={() => {
                history.push(paths[0])
                !isLarge && dispatch(SidebarActions.toggleSidebar(!open))
                ref?.current?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {Icon && (
                <div className='icon'>
                  <Icon />
                </div>
              )}

              <Presence
                condition={open}
                className='label'
                initial={{
                  opacity: 0,
                  x: -24
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: 'tween',
                    duration: 0.4,
                    delay: 0.1 * index
                  }
                }}
                exit={{
                  x: -24,
                  opacity: 0,
                  transition: {
                    type: 'tween',
                    duration: 0.1
                  }
                }}
              >
                {label}
              </Presence>
            </ListItem>
          ))}
        </ul>
      </SidebarNav>

      {routes.map(({ paths, component, noContentMove, exact }, index) => (
        <Content
          index={index}
          key={paths[0]}
          variants={content}
          samePage={samePage}
          innerWidth={innerWidth}
          id={paths[0].replaceAll('/', '--')}
          hasScrollBar={overflow?.overflow !== 'hidden'}
          animate={open && !noContentMove ? 'open' : 'closed'}
          initial={open && !noContentMove ? 'open' : 'closed'}
        >
          {samePage
            ? component && component()
            : paths.map(path => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                />
              ))}
        </Content>
      ))}
    </Style>
  )
}

export default Sidebar
