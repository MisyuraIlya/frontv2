import React, { useState } from 'react'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const AgentClientsFilter = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { agentId } = useParams()

  const handleDebouce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', value)
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  return (
    <Box sx={{ width: '50%', marginBottom: '20px' }}>
      <SearchInput
        handleFunction={handleDebouce}
        value={search}
        setValue={setSearch}
        placeholder="חיפוש לפי שם לקוח או מספר לקוח"
      />
    </Box>
  )
}

export default AgentClientsFilter
