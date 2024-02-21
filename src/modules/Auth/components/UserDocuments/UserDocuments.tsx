import React, { useEffect } from 'react'
import { useAuth } from '../../store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import CreateDocForm from './CreateDocForm'
import { TailSpin } from 'react-loader-spinner'

const UserDocuments = () => {
  const { getUserDocs, userDocs, docLoading } = useAuth()
  const { handlePdfViwer } = useModals()

  useEffect(() => {
    getUserDocs()
  }, [])

  return (
    <div className="Profilepage-subcont2 flex-container">
      <div className={'Profile-page-sub col-lg-12'}>
        <h1>הקבצים שלי</h1>
        <div className={'Profile-page-sub2 flex-container'}>
          <div className="col-lg-6">
            <div className="col-lg-12 flex-container box-cont">
              <div className="col-lg-3 col">
                <p className="title">{'שם קובץ'}</p>
              </div>
            </div>
            {docLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <TailSpin height="40" width="40" color="black" visible={true} />
              </div>
            ) : (
              userDocs?.map((item, index) => {
                if (item.SUFFIX === 'pdf') {
                  return (
                    <div
                      className="col-lg-12 flex-container box-cont"
                      key={index}
                    >
                      <div className="col-lg-7 col">
                        <p className="value" style={{ paddingTop: '10px' }}>
                          {item?.EXTFILEDES}
                        </p>
                      </div>
                      <div className="col-lg-5 col">
                        <p
                          className="value"
                          style={{ paddingTop: '10px' }}
                          onClick={() => handlePdfViwer(item.EXTFILENAME)}
                        >
                          <span className="ExtendBtn material-symbols-outlined">
                            picture_as_pdf
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                }
              })
            )}
          </div>
          <div className="col-lg-6">
            <CreateDocForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDocuments
