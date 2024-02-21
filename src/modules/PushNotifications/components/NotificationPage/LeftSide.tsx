import React, { useEffect, useState } from 'react'
import { useNotificationStore } from '../../store/notificationStore'
import { useForm } from 'react-hook-form'
import MyCropper from '../../../../shared/MyCropper'
import { base64ToFile } from '../../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../Admin/services/mediaObject.service'

interface LeftSideForm {
  title: string
  description: string
  link: string
}

const LeftSide = () => {
  const { choosedItem, createItem, updateItem, fetchItems, setChoosedItem } =
    useNotificationStore()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeftSideForm>()

  const handleForm = async (data: LeftSideForm) => {
    if (choosedItem) {
      choosedItem.title = data.title
      choosedItem.description = data.description
      choosedItem.link = data.link
      updateItem(choosedItem)
      setChoosedItem(null)
    }
  }

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(
      convertFile,
      'notifications'
    )
    if (choosedItem?.id) {
      const res2 = await updateItem({
        id: choosedItem?.id?.toString(),
        image: res['@id'],
      })
    }
    // await MediaObjectService.ftpUploader(res2.image.filePath,'src/img/notifications','notifications')
    fetchItems()
  }

  useEffect(() => {
    if (choosedItem) {
      setValue('title', choosedItem.title || '')
      setValue('description', choosedItem.description || '')
      setValue('link', choosedItem.link || '')
    }
  }, [choosedItem])

  return (
    <form className="col-lg-4 left-side" onSubmit={handleSubmit(handleForm)}>
      {choosedItem?.id ? (
        <div className={'wrapper editing active'}>
          <div className="inputs">
            <input
              type="text"
              placeholder="כותרת ההודעה"
              {...register('title')}
            />
            <textarea placeholder="מלל הודעה" {...register('description')} />
            <input type="text" placeholder="קישור" {...register('link')} />
            <div className="upload-img">
              <img
                className="main-img"
                src={
                  `${process.env.REACT_APP_MEDIA}/notifications/` +
                  choosedItem?.image?.filePath
                }
              />
              <MyCropper
                aspectRatio={16 / 16}
                uploadImg={uploadImg}
                itemImage={''}
              />
            </div>
          </div>
          <div className="save">
            <button type="submit" className="cancel-post">
              <span>בטל</span>
            </button>
            <button type="submit" className="save-post">
              <span>שמור</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="wrapper add">
          <button type="button" onClick={() => createItem(null)}>
            <span className="img material-symbols-outlined">add</span>
            <span>חדש</span>
          </button>
        </div>
      )}
    </form>
  )
}

export default LeftSide
