import React, { useState, useRef, useEffect, FC, ChangeEvent } from 'react'
import ReactDOM from 'react-dom'
import Cropper, { ReactCropperElement } from 'react-cropper'
import SweetAlert from 'sweetalert2'
import 'cropperjs/dist/cropper.css'

interface MyCropperProps {
  aspectRatio: number
  uploadImg: (base64: string, fileName: string) => void
  itemImage: string | null
}

const MyCropper: FC<MyCropperProps> = ({
  aspectRatio,
  uploadImg,
  itemImage,
}) => {
  const [choosedFile, setChoosedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [cropData, setCropData] = useState('')
  const [fileName, setFileName] = useState('')
  const cropperRef = useRef<ReactCropperElement>(null)
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
    }
  }

  const handleSave = () => {
    uploadImg(cropData, fileName)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e)
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFileName(files[0].name)
      setChoosedFile(selectedFile)
      const fileUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(fileUrl)
    }
  }

  const cancle = () => {
    setChoosedFile(null)
  }
  return (
    <div
      className={
        choosedFile ? 'load-image-wrapper absolute' : 'load-image-wrapper'
      }
    >
      <div
        className="addImg"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ul>
          <div>
            <li>
              <img
                src={
                  'https://foodappeal-b2b.com/src/img/icons/add-circular.svg'
                }
              />
            </li>
            <li className="upload">
              <input
                id="upload-file"
                type="file"
                className="upload"
                onChange={handleFileChange}
              />
              <span>הוספת תמונה</span>
            </li>
          </div>
        </ul>

        <div style={{ position: 'absolute', top: '0', zIndex: '-1' }}>
          {itemImage && (
            <img src={`${process.env.REACT_APP_MEDIA}/${itemImage}`} />
          )}
        </div>
      </div>

      {choosedFile
        ? ReactDOM.createPortal(
            <div className="cropp-tool-wrapper">
              <div className="cropp-tool">
                <div className="flex-container">
                  <div id="cropp_view" className="col-lg-6 for-cropp">
                    {previewUrl && (
                      <Cropper
                        src={previewUrl}
                        aspectRatio={aspectRatio}
                        guides={false}
                        checkCrossOrigin={false}
                        ref={cropperRef}
                      />
                    )}
                  </div>
                  {previewUrl && (
                    <div className="col-lg-6">
                      <div className="image-preview">
                        <img src={cropData ? cropData : previewUrl} />
                      </div>
                    </div>
                  )}
                </div>
                <ul className="actions">
                  <li>
                    <button
                      onClick={() => handleSave()}
                      className="button-green"
                    >
                      שמור
                    </button>
                    <button
                      onClick={() => getCropData()}
                      className="button-green"
                    >
                      גזור
                    </button>
                  </li>
                  <li>
                    <button onClick={() => cancle()} className="button-red">
                      ביטול
                    </button>
                  </li>
                </ul>
              </div>
            </div>,
            document.getElementById('modal-root')!
          )
        : null}
    </div>
  )
}

export default MyCropper
