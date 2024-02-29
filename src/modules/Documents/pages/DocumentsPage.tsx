import React from 'react'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocumentList from '../components/DocumentList'
import Loader from '../../../shared/Loader'
import { Container } from '@mui/material'
import CalendarUtil from '../../../utils/Calendar/CalendarUtil'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const DocumentsPage = () => {
  const navigate = useNavigate()
  const {
    loading,
    currentDate,
    setCurrentDate,
    showCalendar,
    setShowCalendar,
    type,
    hydraPagination,
  } = useDocuments()
  const { documentPage, dateFrom, dateTo } = useParams()

  const handleDate = (date: Date) => {
    setCurrentDate(date)
    if (type === 'from') {
      const updatedPathname = `/documentPage/${documentPage}/${moment(date).format('YYYY-MM-DD')}/${dateTo}`
      navigate(updatedPathname)
    }
    if (type === 'to') {
      const updatedPathname = `/documentPage/${documentPage}/${dateFrom}/${moment(date).format('YYYY-MM-DD')}`
      navigate(updatedPathname)
    }
    setShowCalendar(false)
  }

  return (
    <Container maxWidth="xl">
      <CalendarUtil
        show={showCalendar}
        closeHandler={() => setShowCalendar(false)}
        value={currentDate}
        handleCalendar={handleDate}
      />
      {loading && <Loader />}
      <DocsFilter />
      <DocumentList />
      <Pagination hydraPagination={hydraPagination} />
    </Container>
  )
}

export default DocumentsPage
