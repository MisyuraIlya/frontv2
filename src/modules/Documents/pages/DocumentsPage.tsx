import React, { useEffect } from 'react'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocumentList from '../components/DocumentList'
import Loader from '../../../shared/Loader'
import { Container } from '@mui/material'
import CalendarUtil from '../../../utils/Calendar/CalendarUtil'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import { useLocation } from 'react-router-dom'
const DocumentsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    loading,
    currentDate,
    setCurrentDate,
    showCalendar,
    setShowCalendar,
    type,
    hydraPagination,
    setPage,
    getItems,
  } = useDocuments()
  const { documentType, dateFrom, dateTo } = useParams()
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const handleDate = (date: Date) => {
    setCurrentDate(date)
    if (type === 'from') {
      const updatedPathname = `/documentPage/${documentType}/${moment(date).format('YYYY-MM-DD')}/${dateTo}`
      navigate(updatedPathname)
    }
    if (type === 'to') {
      const updatedPathname = `/documentPage/${documentType}/${dateFrom}/${moment(date).format('YYYY-MM-DD')}`
      navigate(updatedPathname)
    }
    setShowCalendar(false)
  }

  useEffect(() => {
    setPage(pageNumber ?? '1')
    getItems(documentType!, new Date(dateFrom!), new Date(dateTo!), pageNumber!)
  }, [pageNumber])

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
      <PaginationUtil hydraPagination={hydraPagination} />
    </Container>
  )
}

export default DocumentsPage
