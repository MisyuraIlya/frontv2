import React from 'react'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'
import Loader from '../../../../../../../shared/Loader'
import { useModals } from '../../../../../provider/ModalProvider'
import { TailSpin } from 'react-loader-spinner'
const OnlineData = () => {
  const { onlineData, onlineLoading } = useSelectedProduct()
  const { handlePdfViwer } = useModals()
  console.log('onlineData', onlineData)
  return (
    <div className="prod-info-cont input-cont flex-container">
      {onlineLoading ? (
        <TailSpin height="40" width="40" color="black" visible={true} />
      ) : (
        <>
          {onlineData?.documents?.length > 0 ? (
            onlineData?.documents.map((item, index) => {
              if (item.SUFFIX == 'pdf' && item?.ELEL_SITEDISPLAY == 'Y') {
                return (
                  <>
                    <div className="col-lg-4" key={index}>
                      <p className="c-title">{item.EXTFILEDES}</p>
                    </div>
                    <div
                      className="col-lg-8"
                      onClick={() => handlePdfViwer(item.EXTFILENAME)}
                    >
                      <span className="ExtendBtn material-symbols-outlined">
                        picture_as_pdf
                      </span>
                    </div>
                  </>
                )
              }
            })
          ) : (
            <div>לא נמצאו מסמכים</div>
          )}
        </>
      )}
    </div>
  )
}

export default OnlineData
