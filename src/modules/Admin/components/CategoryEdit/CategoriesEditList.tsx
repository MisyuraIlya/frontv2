import React, { useState } from 'react'
import { useCategories } from '../../../Catalog/store/CategoriesStore'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { AdminCatalogService } from '../../services/catalog.service'
import CategoryEditItem from './CategoryEditItem'
const CategoriesEditList = () => {
  const { currecntCategories, setCurrentCategories } = useCategories()
  const { lvl1, lvl2, lvl3 } = useParams()
  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedCategories = reorder(
      currecntCategories,
      result.source.index,
      result.destination.index
    )

    const updatedCategories = reorderedCategories.map((category, index) => ({
      ...category,
      orden: index,
    }))

    setCurrentCategories(updatedCategories)
    await AdminCatalogService.dragAndDropCategories(updatedCategories)
  }

  const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  return (
    <div className="items">
      <div className="heading">
        <div className="flex-container">
          <div className="col-lg-1">
            <p>כניסה</p>
          </div>
          <div className="col-lg-1">
            <p>סדר</p>
          </div>
          <div className="col-lg-2">
            <p>תמונה</p>
          </div>
          <div className="col-lg-1 product">
            <p style={{ textAlign: 'right' }}>מזהה</p>
          </div>
          <div className={'col-lg-3 product'}>
            <p style={{ textAlign: 'right' }}>כותרת</p>
          </div>
          {lvl1 === '0' && lvl2 === '0' && lvl3 === '0' && (
            <div className="col-lg-1">
              <p>סטאטוס</p>
            </div>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="items"
              {...provided.innerRef}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {currecntCategories?.map((element, index) => {
                return (
                  <div key={index} id={'item_' + element.id} className="item">
                    <Draggable
                      key={element.id}
                      draggableId={element.id + ''}
                      index={index}
                    >
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
                          <CategoryEditItem element={element} />
                        </div>
                      )}
                    </Draggable>
                  </div>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default CategoriesEditList
