import React, { useEffect } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import ProductsEditItem from './ProductsEditItem'
import { useParams } from 'react-router-dom'
import { useProductsEditStore } from '../../store/ProductsEditStore'
import { AdminProductService } from '../../services/products.service'
const ProductsEditList = () => {
  const { products, setProducts, getProducts, setLvls } = useProductsEditStore()
  const { lvl1, lvl2, lvl3 } = useParams()

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const items = reorder(
      products,
      result.source.index,
      result.destination.index
    )
    setProducts(items)
    await AdminProductService.updateProduct({
      id: result.draggableId,
      orden: result.destination.index,
    })
  }

  useEffect(() => {
    getProducts(lvl1 ?? 0, lvl2 ?? 0, lvl3 ?? 0)
    setLvls(lvl1 ?? 0, lvl2 ?? 0, lvl3 ?? 0)
  }, [])

  const reorder = (list: IProduct[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {products.map((element, index) => {
                return <ProductsEditItem element={element} index={index} />
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {products?.length == 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '50px',
          }}
        >
          <p>אין פריטים עבור קטגוריה זה</p>
        </div>
      )}
    </>
  )
}

export default ProductsEditList
