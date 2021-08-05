import React, {
  forwardRef,
  ReactElement,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { ModalBackground } from './styles'

import CloseIcon from 'assets/global/CloseIcon'

import { GlobalContext, GlobalContextProps } from 'App'
import { ThemeContext } from 'styled-components'

export interface ModalProps {
  id?: string
  top?: string
  zIndex?: number
  bottom?: string
  bgHeight?: string
  translateY?: string
  children?: ReactElement | ReactElement[]
  onClose?: () => void
  closeIcon?: boolean
}

interface ModalConfig {
  props?: ModalProps
  content?: ReactElement | ReactElement[] | string
  close?: { top?: number; right?: number; color?: string }
}

export interface ModalMethods {
  toggle: (_open?: boolean) => void
  config: (_content: ModalConfig) => void
}

const initialConfig = { content: undefined, setModal: false }

const Modal = forwardRef<ModalMethods, ModalProps>(
  (
    {
      children,
      closeIcon = true,
      onClose,
      top = '50vh',
      bottom = 'auto',
      bgHeight = '100%',
      translateY = '-60%',
      ...rest
    },
    ref
  ) => {
    const { overflow } = useContext<GlobalContextProps>(GlobalContext)
    const theme = useContext(ThemeContext)

    const [{ content, close, props }, setModalConfig] =
      useState<ModalConfig>(initialConfig)

    const [openModal, setOpenModal] = useState(false)

    const modalRef = useRef(null)

    const zindex = props?.zIndex ? props.zIndex : 9000

    window.addEventListener('keydown', ({ key }) => {
      key === 'Escape' && setOpenModal(false)
    })

    const toggle = (setModal?: boolean) => {
      if (setModal === undefined) {
        setOpenModal(!openModal)

        overflow?.setOverflow &&
          overflow?.setOverflow({ overflow: !setModal ? 'hidden' : 'auto' })
      } else {
        setOpenModal(setModal)

        overflow?.setOverflow &&
          overflow?.setOverflow({ overflow: setModal ? 'hidden' : 'auto' })
      }
    }

    const config = (content: ModalConfig) => {
      setTimeout(() => setModalConfig(content), 1)
    }

    const onBackgroundClick = () => {
      onClose && onClose()
      setOpenModal(false)
      overflow?.setOverflow && overflow?.setOverflow({ overflow: 'auto' })
    }

    useImperativeHandle(ref, () => ({ config, toggle }))

    return openModal ? (
      <>
        <ModalBackground
          zIndex={zindex}
          height={bgHeight}
          onClick={onBackgroundClick}
        />

        <Style
          top={props?.top || top}
          ref={modalRef}
          zIndex={props?.zIndex || zindex}
          bottom={props?.bottom || bottom}
          translateY={props?.translateY || translateY}
          closeTop={close?.top ? `${close.top}px` : '8px'}
          closeColor={close?.color || theme.colors.secondary}
          closeRight={close?.right ? `${close.right}px` : '8px'}
          {...rest}
        >
          {closeIcon && (
            <CloseIcon id='ModalCloseIcon' onClick={onBackgroundClick} />
          )}

          {content || children}
        </Style>
      </>
    ) : (
      <></>
    )
  }
)

export default Modal
