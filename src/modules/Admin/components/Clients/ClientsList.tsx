import React from 'react'
import Head from './Head'
import ClientItem from './ClientItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box, Divider } from '@mui/material'
import useDataClients from '../../hooks/useDataClients'

const ClientsList = () => {
  const { data, isLoading } = useDataClients()
  return (
    <Box>
      <Head />
      {isLoading && (
        <Skeleton style={{ height: '30px', margin: '5px 0px' }} count={24} />
      )}
      {data?.['hydra:member']?.map((element, index) => {
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
