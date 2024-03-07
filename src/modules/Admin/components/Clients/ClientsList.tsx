import React from 'react'
import Head from './Head'
import { useClientStore } from '../../store/ClientsStore'
import ClientItem from './ClientItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box, Divider } from '@mui/material'

const ClientsList = () => {
  const { clients, loading } = useClientStore()
  return (
    <Box>
      <Head />
      {loading && (
        <Skeleton style={{ height: '30px', margin: '5px 0px' }} count={24} />
      )}
      {clients?.map((element, index) => {
        return (
          <>
            <ClientItem element={element} index={index} />
            <Divider sx={{ width: '100%' }} />
          </>
        )
      })}
    </Box>
  )
}

export default ClientsList
