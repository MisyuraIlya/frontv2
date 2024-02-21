import React, { FC } from 'react'

interface SideButtonProps {
  onClickBtn: () => void
  imgLink: string
}

const SideButton: FC<SideButtonProps> = ({ onClickBtn, imgLink }) => {
  return (
    <div className="MySideButton myCenterAlign" onClick={() => onClickBtn()}>
      <img src={imgLink} />
    </div>
  )
}

export default SideButton
