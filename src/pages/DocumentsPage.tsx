import React from 'react'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../modules/Documents/components/DocsFilter'
import DocumentList from '../modules/Documents/components/DocumentList'
import { Box, Container } from '@mui/material'
import CalendarUtil from '../utils/CalendarUtil'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import PaginationUtil from '../utils/PaginationUtil'
import KartessetLst from '../modules/Documents/components/KartessetLst'
import Loader from '../shared/Loader'
import useDataDocuments from '../hooks/useDataDocuments'
import { findDocumentTypeTitle } from '../helpers/handleBreadCrumbs'
import Documents from '../components/Documents'
import Utils from '../utils'

type RouteParams = {
  documentType: IDocumentTypes
  dateFrom: string
  dateTo: string
}

const DocumentsPage = () => {
  const navigate = useNavigate()
  const { currentDate, setCurrentDate, showCalendar, setShowCalendar, type } =
    useDocuments()

  const { documentType, dateFrom, dateTo } = useParams<RouteParams>()
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

  const { hydraPagination, isLoading } = useDataDocuments()

  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: findDocumentTypeTitle(documentType),
              link: '',
            },
          ]}
        />
      </Box>
      {/* <DocsFilter />
      {componentToRender}
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />} */}
      <Documents.Document.Filter />
      <Documents.Document.Head />
      <Documents.Document.List />
      <Documents.Document.Pagination />
    </Container>
  )
}

export default DocumentsPage
