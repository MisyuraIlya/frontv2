import React, { FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

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
  const modalRootRef = useRef(document.getElementById('modal-root'))

  useEffect(() => {
    modalRootRef.current = document.getElementById('modal-root')
  }, [])

  if (!modalRootRef.current) {
    return null // Or return an error message/component if 'modal-root' is not found
  }

  return (
    <>
      {active &&
        ReactDOM.createPortal(
          <div className="my-modal prod-info">
            <div
              className={`modal-wrapper animated ${
                active && 'shopCartSpecialSet'
              }`}
              style={{ width: width + '%', height: height + '%' }}
            >
              <div className="close-cont">
                <div onClick={() => setActive(!active)} className="close">
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
              {children}
            </div>
            <div onClick={() => setActive(!active)} className="overflow"></div>
          </div>,
          modalRootRef.current
        )}
    </>
  )
}

export default ModalWrapper
