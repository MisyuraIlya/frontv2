import React from 'react'
import { themeColors } from '../../../styles/mui'
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
import useDataCartesset from '../../../hooks/useDataCartesset'
import moment from 'moment'

const List = () => {
  const { data, isLoading } = useDataCartesset()
  return (
    <Box sx={{ margin: '50px 0px' }}>
      {data?.lines?.['hydra:member'].length === 0 && !isLoading ? (
        <Typography variant="h5">לא נמצאו מסמכים בטווח תאריכים</Typography>
      ) : null}
      {(data?.lines?.['hydra:member'] ?? []).length > 0 ? (
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
                    ת. למאזן
                  </Typography>
                </TableCell>
                <TableCell className="col-cont sticky-col">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    תנועה
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    ת.אסמכתא
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
                    אסמכתא
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    פרטים
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    חובה/זכות
                  </Typography>
                </TableCell>
                <TableCell className="col-cont">
                  <Typography
                    variant="body2"
                    color={themeColors.primary}
                    fontWeight={800}
                  >
                    יתרה
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.lines?.['hydra:member']?.map((element, index) => {
                  return (
                    <TableRow key={index} className={'item'}>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.tnua}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.asmahta1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.dateEreh).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.hova}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{element?.zhut}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.yetra ? element.yetra : ''}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
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

export default List
