import React from 'react'
import UserItem from './UserItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material'
import useDataUsers from '../../hooks/useDataUsers'
import HeadUser from './HeadUser'
import Loader from '../../../../shared/Loader'

const UserList = () => {
  const { data, isLoading } = useDataUsers()
  return (
    <TableContainer component={Paper}>
      {isLoading && <Loader />}
      <Table>
        <HeadUser />
        {data?.['hydra:member']?.map((element, index) => {
          return (
            <TableBody key={index}>
              <UserItem element={element} index={index} />
            </TableBody>
          )
        })}
      </Table>
    </TableContainer>
  )
}

export default UserList
