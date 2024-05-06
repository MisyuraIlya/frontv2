import React from 'react'
import { useClientStore } from '../../store/ClientsStore'
import { useNavigate, useParams } from 'react-router-dom'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { Box, Typography } from '@mui/material'
import useDataClients from '../../hooks/useDataUsers'
import { themeColors } from '../../../../styles/mui'

type RouteParams = {
  userRole: ROLE_TYPES
}

const UserFilter = () => {
  const { search, setSearch } = useClientStore()
  const navigate = useNavigate()
  const { data } = useDataClients()
  const { userRole } = useParams<RouteParams>()
  const handleDebouce = (value: string) => {
    if (value) {
      const urlSearchParams = new URLSearchParams(location.search)
      urlSearchParams.set('search', value)
      const url = urlSearchParams.toString()
      navigate(`/admin/${userRole}?${url}`)
    }
  }
  const total = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
        <Typography variant="h5">
          {userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות'}
        </Typography>
        <Typography variant="body1" color={themeColors.asphalt}>
          {'נמצאו: ' + total + ' לקוחות'}
        </Typography>
      </Box>
      <Box>
        <SearchInput
          placeholder="חיפוש לקוח"
          handleFunction={handleDebouce}
          value={search}
          setValue={setSearch}
        />
      </Box>
    </Box>
  )
}

export default UserFilter
