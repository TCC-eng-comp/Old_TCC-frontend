import React, { useState } from 'react'
import Style, { RightMenu } from './styles'

import api from 'services/api'

import { UserActions } from 'store/user'
import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import CameraIcon from 'assets/Inputs/CameraIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import 'cropperjs/dist/cropper.css'
import { motion } from 'framer-motion'
import { Cropper } from 'react-cropper'
import { useDispatch, useSelector } from 'react-redux'

interface ImageChangerProps {
  onCloseClick: () => void
}

const ImageChanger = ({ onCloseClick: onCloseClicked }: ImageChangerProps) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const { white, red } = theme.colors
  const dispatch = useDispatch()
  const [image, setImage] = useState()
  const [cropper, setCropper] = useState<any>()
  const [noImage, setNoImage] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const onChange = (e: any) => {
    e.preventDefault()
    let files
    const reader = new FileReader()

    if (e.dataTransfer) files = e.dataTransfer.files
    else if (e.target) files = e.target.files

    reader.onload = () => setImage(reader.result as any)
    reader.readAsDataURL(files[0])
    setShowUpload(true)
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      const result = await api.put('/user/avatar', {
        picture: cropper.getCroppedCanvas().toDataURL()
      })

      dispatch(UserActions.updateUserInfo({ avatar_uuid: result.object }))
      onCloseClicked()
    } else {
      setNoImage(true)
      setTimeout(() => setNoImage(false), 300)
    }
  }

  const onCloseClick = () => onCloseClicked()

  return (
    <Style>
      <div>
        <motion.label
          htmlFor='first'
          id='firstFileSelect'
          transition={{ duration: 0.3 }}
          animate={{
            color: noImage ? [white, red, white] : white,
            borderColor: noImage ? [white, red, white] : white
          }}
        >
          Selecionar um arquivo
        </motion.label>

        <input id='first' type='file' onChange={onChange} />

        <Cropper
          center
          className='Cropper'
          preview='#img-preview'
          dragMode='move'
          src={image}
          background={false}
          viewMode={3}
          aspectRatio={1}
          guides={false}
          minCropBoxHeight={80}
          minCropBoxWidth={80}
          checkOrientation={false}
          onInitialized={instance => setCropper(instance)}
        />
      </div>

      <RightMenu>
        <CloseIcon onClick={onCloseClick} />

        <div id='preview'>
          <span>Antevisão</span>

          <div id='img-preview' />
          <div id='before-img-preview' />
        </div>

        {showUpload && (
          <div>
            <label htmlFor='other' id='otherFileSelect'>
              <div>Enviar outra foto</div>

              <CameraIcon />
            </label>

            <input type='file' id='other' onChange={onChange} />
          </div>
        )}

        <button type='button' id='confirmButton' onClick={onConfirmClick}>
          Salvar
        </button>
      </RightMenu>
    </Style>
  )
}

export default ImageChanger
