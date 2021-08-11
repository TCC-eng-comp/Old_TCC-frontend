import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import CloseIcon from 'assets/global/CloseIcon'

import Modal, { ModalForwardeds } from 'components/Modal'

export type PopupType = 'error' | 'warning' | 'success' | 'other'

interface ConfigPopupProps {
  title?: string
  open?: boolean
  type?: PopupType
  message?: string
  onClick?: () => void
  onOkClick?: () => void
  onCloseClick?: () => void
}

export interface PopupForwardeds {
  configPopup: (_config: ConfigPopupProps) => void
}

const initialState: ConfigPopupProps = { type: 'warning', open: false }

const titleLabel = (type: PopupType, title?: string) => {
  switch (type) {
    case 'success':
      return 'Sucesso'
    case 'warning':
      return 'Atenção'
    case 'error':
      return 'Error'
    default:
      return title || ''
  }
}

const Popup = forwardRef<PopupForwardeds, any>((props, ref) => {
  const modalRef = useRef<ModalForwardeds>(null)

  const [
    { type, open, message, title, onClick, onOkClick, onCloseClick },
    setConfigState
  ] = useState<ConfigPopupProps>(initialState)

  const onPopupCloseClick = () => {
    setConfigState(prev => ({ ...prev, open: false }))

    if (onClick) onClick()
    else onCloseClick && onCloseClick()
  }

  const onPopupOkClick = () => {
    setConfigState(prev => ({ ...prev, open: false }))

    if (onClick) onClick()
    else onOkClick && onOkClick()
  }

  const forwardConfigPopup = (content: ConfigPopupProps) =>
    setConfigState(content)

  useEffect(() => {
    modalRef?.current?.toggle(open)
  }, [open])

  useImperativeHandle(ref, () => ({ configPopup: forwardConfigPopup }))

  return open ? (
    <Modal ref={modalRef}>
      <Style type={type || 'other'}>
        <CloseIcon onClick={onPopupCloseClick} />

        <span>{titleLabel(type || 'other', title)}</span>

        {message && <hr />}

        <p>{message}</p>

        <button type='button' onClick={onPopupOkClick}>
          Entendi!
        </button>
      </Style>
    </Modal>
  ) : (
    <></>
  )
})

export default Popup
