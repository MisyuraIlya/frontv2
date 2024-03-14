import { Box, Card, Container } from '@mui/material'
import React, { useState } from 'react'
import VisitsList from '../components/VisitsList'
import SearchInput from '../../../utils/SearchInput/SearchInput'
import useDataAgentObjectives from '../hooks/useDataAgentObjectives'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'

const AgentVisits = () => {
  const [search, setSearch] = useState<string>('')
  const { hydraPagination } = useDataAgentObjectives('visit')

  const handleDebouce = (value: string) => {
    if (value) {
    }
  }

  return (
    <Container maxWidth="lg">
      <Card sx={{ padding: '10px', borderRadius: '5px' }}>
        <SearchInput
          placeholder="חיפוש לקוח"
          handleFunction={handleDebouce}
          value={search}
          setValue={setSearch}
        />
      </Card>
      <VisitsList />

      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default AgentVisits
