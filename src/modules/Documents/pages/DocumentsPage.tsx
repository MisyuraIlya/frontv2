import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocsHead from '../components/DocsHead'
import { useDocumentsProvider } from '../provider/DocumentsProvider'
import DocumentList from '../components/DocumentList'
import Loader from '../../../shared/Loader'
import { Container } from '@mui/material'
import CalendarUtil from '../../../utils/Calendar/CalendarUtil'
import { useModals } from '../../Modals/provider/ModalProvider'

const DocumentsPage = () => {
  const [active, setActive] = useState(false)
  const { loading, totalPages, hydraPagination } = useDocuments()
  // const { handleCalendar } = useDocumentsProvider()

  return (
    <Container maxWidth="xl">
      {loading && <Loader />}
      <DocsFilter />
      <DocumentList />
      <Pagination hydraPagination={hydraPagination} />
    </Container>
  )
}

export default DocumentsPage
