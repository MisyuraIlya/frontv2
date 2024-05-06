import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { AdminCatalogService } from '../../services/catalog.service'
import CategoryEditItem from './CategoryEditItem'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import useDataCategoryEdit from '../../hooks/useDataCategoryEdit'

const CategoriesEditList = () => {
  const { data } = useDataCategoryEdit()
  const [categories, setCategories] = useState<ICategory[]>([])

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

    setCategories(updatedCategories)
    await AdminCatalogService.dragAndDropCategories(updatedCategories)
  }

  const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setCategories(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            sx={{ margin: '0' }}
            {...provided.innerRef}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TableContainer component={Paper}>
              <Table className="lines-sub-cont">
                <TableHead>
                  <TableRow className="heading">
                    <TableCell className="col-cont sticky-col"></TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">תמונה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">מזהה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">שם קטגוריה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">סטאטוס</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map((element, index) => {
                    return (
                      <Draggable
                        key={element.id}
                        draggableId={element.id + ''}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <CategoryEditItem element={element} />
                          </TableRow>
                        )}
                      </Draggable>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CategoriesEditList
