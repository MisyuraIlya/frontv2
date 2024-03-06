import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { AdminCatalogService } from '../../services/catalog.service'
import CategoryEditItem from './CategoryEditItem'
import { Box, Grid, Typography } from '@mui/material'
import { useAdminCategories } from '../../store/CategoriesStore'

const CategoriesEditList = () => {
  const { categories } = useAdminCategories()
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
      categories,
      result.source.index,
      result.destination.index
    )

    const updatedCategories = reorderedCategories.map((category, index) => ({
      ...category,
      orden: index,
    }))

    // setCurrentCategories(updatedCategories)
    await AdminCatalogService.dragAndDropCategories(updatedCategories)
  }

  const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Typography variant="body1">{'כניסה'}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1">{'סדר'}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">{'תמונה'}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1">{'מזהה'}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{'כותרת'}</Typography>
        </Grid>
        {lvl1 === '0' && lvl2 === '0' && lvl3 === '0' && (
          <Grid item xs={1}>
            <Typography variant="body1">{'סטאטוס'}</Typography>
          </Grid>
        )}
      </Grid>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              {...provided.innerRef}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {categories?.map((element, index) => {
                return (
                  <Box key={index}>
                    <Draggable
                      key={element.id}
                      draggableId={element.id + ''}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <CategoryEditItem element={element} />
                        </Box>
                      )}
                    </Draggable>
                  </Box>
                )
              })}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default CategoriesEditList
