import React, { useEffect } from 'react'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocumentList from '../components/DocumentList'
import Loader from '../../../shared/Loader'
import { Box, Container } from '@mui/material'
import CalendarUtil from '../../../utils/Calendar/CalendarUtil'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import { useLocation } from 'react-router-dom'
import KartessetLst from '../components/KartessetLst'

type RouteParams = {
  documentType: IDocumentTypes
  dateFrom: string
  dateTo: string
}

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
  const { documentType, dateFrom, dateTo } = useParams<RouteParams>()
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

  let componentToRender: React.ReactNode

  switch (documentType) {
    case 'history':
    case 'draft':
    case 'orders':
    case 'priceOffer':
    case 'deliveryOrder':
    case 'aiInvoice':
    case 'ciInvoice':
      componentToRender = <DocumentList />
      break
    case 'kartesset':
      componentToRender = <KartessetLst />
      break
    default:
      componentToRender = <Box>{'לא נמצא סוג מסמך כזה'}</Box>
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
      {componentToRender}
      <PaginationUtil hydraPagination={hydraPagination} />
    </Container>
  )
}

export default DocumentsPage
