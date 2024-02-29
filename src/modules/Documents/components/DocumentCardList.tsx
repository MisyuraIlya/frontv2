import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useDocumentsItem } from '../store/DocumentsItemStore'
import { themeColors } from '../../../styles/mui'

const DocumentCardList = () => {
  const { orderItems, loading } = useDocumentsItem()
  const { selectProduct } = useModals()

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מוצר
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  כמות
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מחיר יח'
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  הנחה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  סה״כ
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems?.map((element, index) => (
              <TableRow
                key={index}
                className={'item'}
                id={'docRow_' + index}
                onClick={() => selectProduct(element?.product)}
              >
                <TableCell>
                  <img
                    className="img"
                    width={100}
                    src={
                      element?.product?.defaultImagePath
                        ? process.env.REACT_APP_MEDIA +
                          '/product/' +
                          element?.product?.defaultImagePath
                        : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <Typography>{'#' + element?.sku}</Typography>
                  <Typography>{element?.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.priceByOne}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.discount.toFixed(1) + '%'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {numberWithCommas(element?.total.toFixed(1))}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="centered">
        {orderItems?.length === 0 && !loading ? (
          <h1 className="no-products">לא נמצאו פריטים למסמך זה</h1>
        ) : null}
      </Box>
    </>
  )
}

export default DocumentCardList
