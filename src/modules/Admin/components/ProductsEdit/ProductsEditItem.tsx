import React, { FC, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { base64ToFile } from '../../../../helpers/base64ToFile'
// import MyCropper from '../../../../components/tools/MyCropper';
import { useParams } from 'react-router-dom'
import { useProductsEditStore } from '../../store/ProductsEditStore'
import { AdminProductService } from '../../services/products.service'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { MediaObjectService } from '../../services/mediaObject.service'
import MyCropper from '../../../../shared/MyCropper'

interface ProductsEditItemProps {
  element: IProduct
  index: number
}

const ProductsEditItem: FC<ProductsEditItemProps> = ({ element, index }) => {
  const { products, getProducts, setProducts, setSelectedProduct } =
    useProductsEditStore()
  const { gallery, setGallery } = useModals()
  const { lvl1, lvl2, lvl3 } = useParams()
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })
  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(convertFile, 'product')
    const res2 = await AdminProductService.createNewImage({
      product: element['@id'],
      mediaObject: res['@id'],
    })
    await MediaObjectService.ftpUploader(
      res2.mediaObject.filePath,
      'src/img/products',
      'product'
    )
    await getProducts(lvl1 ?? 0, lvl2 ?? 0, lvl3 ?? 0)
  }

  const unpublishHandle = async (productId: string, isPublished: boolean) => {
    const newProd = products.map((item) => {
      if (item.id.toString() === productId) {
        item.isPublished = isPublished
      }
      return item
    })
    setProducts(newProd)
    await AdminProductService.updateProduct({ id: productId, isPublished })
  }

  return (
    <div key={index} id={'item_' + element?.id} className="item">
      <Draggable key={element.id} draggableId={element.id + ''} index={index}>
        {(provided, snapshot) => (
          <div
            className="item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <div className="flex-container">
              <div className="col-lg-1 sort MyCenetred">
                <span className="material-symbols-outlined">
                  drag_indicator
                </span>
              </div>
              <div className="col-lg-1 for-img">
                <div
                  className={
                    element?.defaultImagePath ? 'img-load active' : 'img-load'
                  }
                >
                  <MyCropper
                    aspectRatio={16 / 16}
                    uploadImg={uploadImg}
                    itemImage={
                      element?.defaultImagePath
                        ? `product/${element?.defaultImagePath}`
                        : null
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-1 MyCenetred"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setGallery(true)
                  setSelectedProduct(element)
                }}
              >
                <span className="material-symbols-outlined">imagesmode</span>
              </div>
              <div className="col-lg-3 title">
                <p>{element?.title}</p>
              </div>
              <div className="col-lg-2 title">
                <p>{element?.sku}</p>
              </div>
              <div className="col-lg-3">
                <div className="flex-container">
                  <div className="col-lg-3 status sale"></div>
                  <div className="col-lg-3 status sale"></div>
                  <div className="col-lg-3 status sale"></div>
                  <div className="col-lg-3 status">
                    {!element?.isPublished ? (
                      <div
                        onClick={(e) =>
                          unpublishHandle(element.id.toString(), true)
                        }
                        className="input active"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: 'white',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          done
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={(e) =>
                          unpublishHandle(element.id.toString(), false)
                        }
                        className="input"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: 'white',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          close
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default ProductsEditItem
