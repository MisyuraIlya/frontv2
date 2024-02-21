import React from 'react'
import { useAuth } from '../../store/useAuthStore'
import Select from 'react-select'
import AtarSelection from '../AtarSelection'

const AtarimProfile = () => {
  const { atarSelected } = useAuth()

  return (
    <div className="Profilepage-subcont2 flex-container">
      <div className={'Profile-page-sub col-lg-12'}>
        <h1>אתרים</h1>

        <div className={'Profile-page-sub2 flex-container'}>
          <div className="col-lg-12 flex-container box-cont">
            <div className="col-lg-3 col">
              <p className="title">{'כתובת'}</p>
              <p className="value" style={{ paddingTop: '10px' }}>
                {atarSelected?.address}
              </p>
            </div>
            <div className="col-lg-2 col">
              <p className="title">{'עיר'}</p>
              <p className="value" style={{ paddingTop: '10px' }}>
                {atarSelected?.city}
              </p>
            </div>
            <div className="col-lg-3 col">
              <p className="title">{'שם'}</p>
              <p className="value" style={{ paddingTop: '10px' }}>
                {atarSelected?.title}
              </p>
            </div>
            <div className="col-lg-4 col MyCentered">
              <p className="title">{'שנה אתר'}</p>
              <AtarSelection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtarimProfile
