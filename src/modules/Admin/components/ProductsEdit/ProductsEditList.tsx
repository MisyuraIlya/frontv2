import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import ProductsEditItem from './ProductsEditItem'
import { AdminProductService } from '../../../../services/AdminProducts.service'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import useDataProductsEdit from '../../../../hooks/useAdminDataProductsEdit'
const ProductsEditList = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { data } = useDataProductsEdit()

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

  const reorder = (list: IProduct[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setProducts(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            sx={{ margin: '0' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TableContainer component={Paper}>
              <Table className="lines-sub-cont">
                <TableHead>
                  <TableRow className="heading">
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">תמונה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">גלריה</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">מק״ט</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">כותרת מוצר</Typography>
                    </TableCell>
                    <TableCell className="col-cont sticky-col">
                      <Typography variant="subtitle2">סטטוס</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((element, index) => {
                    return <ProductsEditItem element={element} index={index} />
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

{
  /* {products?.length == 0 && (
        <Box className="centered">
          <Typography variant="body2">אין פריטים עבור קטגוריה זה</Typography>
        </Box>
      )} */
}
{
  /* <Box sx={{ borderBottom: '5px solid #e2e3e6', width: '100%' }}>
        <Grid container spacing={1} sx={{ margin: '0 20px' }}>
          <Grid item xs={1}>
            <Typography variant="h6">{'סדר'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'תמונה'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'גלריה'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{'כותרת'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'מק״ט'}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{'סטאטוס'}</Typography>
          </Grid>
        </Grid>
      </Box> */
}
export default ProductsEditList
