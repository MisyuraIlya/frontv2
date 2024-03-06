import React, { useEffect } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocumentList from '../components/DocumentList'
import { Box, Container } from '@mui/material'
import CalendarUtil from '../../../utils/Calendar/CalendarUtil'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import { useLocation } from 'react-router-dom'
import KartessetLst from '../components/KartessetLst'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import Loader from '../../../shared/Loader'

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
    setSelectedDocument,
  } = useDocuments()
  const { documentType, dateFrom, dateTo } = useParams<RouteParams>()
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const handleDate = (date: Date) => {
    setCurrentDate(date)
    if (type === 'from') {
      const updatedPathname = `/documentPage/${documentType}/${moment(date).format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
    if (type === 'to') {
      const updatedPathname = `/documentPage/${documentType}/${dateFrom}/${moment(date).format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
    setShowCalendar(false)
  }

  useEffect(() => {
    setPage(pageNumber ?? '1')
    getItems(documentType!, new Date(dateFrom!), new Date(dateTo!), pageNumber!)
    setSelectedDocument(documentType!)
  }, [pageNumber, documentType])

  let componentToRender: React.ReactNode

  switch (documentType) {
    case 'history':
    case 'draft':
    case 'order':
    case 'priceOffer':
    case 'deliveryOrder':
    case 'aiInvoice':
    case 'ciInvoice':
    case 'returnOrder':
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
      {loading && <Loader />}
      <CalendarUtil
        show={showCalendar}
        closeHandler={() => setShowCalendar(false)}
        value={currentDate}
        handleCalendar={handleDate}
      />
      <BreadCrumbsUtil array={[]} />
      <DocsFilter />
      {componentToRender}
      <PaginationUtil hydraPagination={hydraPagination} />
    </Container>
  )
}

export default DocumentsPage
