import React from 'react'
import { useDocuments } from '../store/DocumentsStore'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material' // Import Material-UI components
import { themeColors } from '../../../styles/mui'

const DocumentList = () => {
  const { items, searchValue, loading, clerOrderItems } = useDocuments()
  const navigate = useNavigate()
  //TODO FIX INTERFACE OF THE HISOTRY
  return (
    <>
      <Box sx={{ marginTop: '50px' }}>
        {/* {!showCalendar && items.length === 0 ? (
          <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
        ) : null}
        {items.length === 0 && !loading ? (
          <h1 className="no-products">לא נמצאו מסמכים בטווח תאריכים</h1>
        ) : null}
        {searchValue && searchValue.length === 0 ? (
          <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1>
        ) : null} */}
        {items.length > 0 ? (
          <TableContainer component={Paper}>
            <Table className="lines-sub-cont">
              <TableHead>
                <TableRow className="heading">
                  <TableCell className="col-cont sticky-col">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      #
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont sticky-col">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      לקוח
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      סוג
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      ת.ערך
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      ת.תשלום
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      סה״כ
                    </Typography>
                  </TableCell>
                  <TableCell className="col-cont">
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      סטאטוס
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((element, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={'item'}
                      onClick={() => {
                        if (element.type === 'טיוטה') {
                          navigate(
                            `/historyItemPage/${element?.document_number}`
                          )
                        } else {
                          navigate(
                            `/documentItemPage/${element?.document_type}/${element?.document_number}`
                          )
                        }
                        clerOrderItems()
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2">
                          {'#' + element?.document_number}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {'#' + element?.userExId}
                        </Typography>
                        <Typography variant="body2">
                          {element?.user_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.type}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.date).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.date_payed).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.total.toFixed(1)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {element?.status ? (
                          <Typography variant="body2">
                            {element?.status ? element?.status : 'אושר'}
                          </Typography>
                        ) : (
                          <Typography variant="body2">ממתין</Typography>
                        )}
                      </TableCell>
                      {/* <TableCell >
                            {element?.DocumentID !== '31' && element?.DocumentID !== '3' ? (
                              <Button variant="contained" onClick={() => downloadFile(element, 'pdf')}>
                                <span >picture_as_pdf</span>
                              </Button>
                            ) : null}
                          </TableCell> */}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </>
  )
}

export default DocumentList
