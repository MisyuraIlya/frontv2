import React, { FC } from 'react'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'

type ModalWrapperProps = {
  active: boolean
  setActive: (bool: boolean) => void
  children: any
  height: number
  width: number
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  active,
  setActive,
  children,
  height,
  width,
}) => {
  const isMobile = window.innerWidth <= 800

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: `${height}%`,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: width ? `${width}%` : isMobile ? '80%' : '60%',
  }

  return (
    <>
      <Modal open={active} onClose={() => setActive(false)} disableAutoFocus>
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  )
}

export default ModalWrapper
