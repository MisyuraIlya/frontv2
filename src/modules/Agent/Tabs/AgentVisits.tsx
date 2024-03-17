import { Box, Card, Container, Fab } from '@mui/material'
import React, { useState } from 'react'
import VisitsList from '../components/agentVisits/VisitsList'
import SearchInput from '../../../utils/SearchInput/SearchInput'
import useDataAgentObjectives from '../hooks/useDataAgentObjectives'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import AddIcon from '@mui/icons-material/Add'
import VisitPopUp from '../components/agentVisits/VisitPopUp'

const AgentVisits = () => {
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { hydraPagination } = useDataAgentObjectives('visit')

  const handleDebouce = (value: string) => {
    if (value) {
    }
  }

  return (
    <>
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
        {hydraPagination && (
          <PaginationUtil hydraPagination={hydraPagination} />
        )}
      </Container>
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: 'absolute',
          right: '50px',
          bottom: '50px',
          borderRadius: '5px',
          width: '80px',
          height: '80px',
        }}
      >
        <AddIcon style={{ fontSize: '50px' }} />
      </Fab>
      <VisitPopUp open={open} setOpen={setOpen} />
    </>
  )
}

export default AgentVisits
