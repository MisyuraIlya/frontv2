import React from 'react'
import useDataNotification from '../../../hooks/useDataNotification'
import { Box } from '@mui/material'
import Card from './Card'

const List = () => {
  const { data } = useDataNotification()
  return (
    <Box>
      {data?.['hydra:member']?.map((element, index) => {
        return <Card element={element} index={index} />
      })}
    </Box>
  )
}

export default List
