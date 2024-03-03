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
  Box,
  Typography,
} from '@mui/material' // Import Material-UI components
import { themeColors } from '../../../styles/mui'
import { DocumentTypeHebrew } from '../helpers/DocumentTypeHebrew'

const DocumentList = () => {
  const { items, showCalendar, searchValue, loading, clerOrderItems } =
    useDocuments()
  const navigate = useNavigate()
  return (
    <Box sx={{ marginTop: '50px' }}>
      {!showCalendar && items.length === 0 ? (
        <Typography variant="h5">בחר טווח תאריכים ובצע חיפוש</Typography>
      ) : null}
      {items.length === 0 && !loading ? (
        <Typography variant="h5">לא נמצאו מסמכים בטווח תאריכים</Typography>
      ) : null}
      {searchValue && searchValue.length === 0 ? (
        <Typography variant="h5">לא נמצאו מסמכים בתאריכים אלו</Typography>
      ) : null}
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
                      navigate(
                        `/documentItemPage/${element?.documentType}/${element?.documentNumber}`
                      )
                      clerOrderItems()
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {'#' + element?.documentNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {'#' + element?.userExId}
                      </Typography>
                      <Typography variant="body2">
                        {element?.userName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {DocumentTypeHebrew(element?.documentType)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {moment(element?.createdAt).format('DD-MM-YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {moment(element?.updatedAt).format('DD-MM-YYYY')}
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
  )
}

export default DocumentList
