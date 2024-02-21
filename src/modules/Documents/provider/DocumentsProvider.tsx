// Global
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// Local
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'

interface DocumentsContextType {
  handleCalendar: (date: Date) => void
}
const DocumentsContext = createContext<DocumentsContextType | null>(null)

// React hook
const useDocumentsProvider = () => {
  const context = useContext(DocumentsContext)
  if (!context) {
    throw new Error('Can not run without "DocumentsProvider"')
  }
  return context
}

interface DocumentsProviderProps {
  children?: ReactNode
}

const DocumentsProvider: FC<DocumentsProviderProps> = (props) => {
  const {
    setShowCalendar,
    type,
    setPage,
    setDateFrom,
    setDateTo,
    getItems,
    setDocumentType,
  } = useDocuments()

  const navigate = useNavigate()
  const location = useLocation()
  const isDocumentPage = location.pathname.includes('documentPage')
  const isKartessetPage = location.pathname.includes('kartessetPage')
  const isHistoryPage = location.pathname.includes('historyPage')

  const handleCalendar = (date: Date) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.get('page')

    if (type === 'from') {
      setDateFrom(date)
      urlSearchParams.set('from', moment(date).format('YYYY-MM-DD'))
      urlSearchParams.get('to')
    }
    if (type === 'to') {
      setDateTo(date)
      urlSearchParams.set('to', moment(date).format('YYYY-MM-DD'))
      urlSearchParams.get('from')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(updatedUrl)
    setShowCalendar(false)
  }

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const page = urlSearchParams.get('page')
    const from = urlSearchParams.get('from')
    const to = urlSearchParams.get('to')
    setPage(page)
    if (from) {
      setDateFrom(new Date(from))
    }
    if (to) {
      setDateTo(new Date(to))
    }
    if (isDocumentPage) {
      setDocumentType('document')
    }
    if (isKartessetPage) {
      setDocumentType('kartesset')
    }
    if (isHistoryPage) {
      setDocumentType('history')
    }
    getItems()
  }, [location.search, location.pathname])

  const value = {
    handleCalendar,
  }

  return (
    <DocumentsContext.Provider value={value} {...props}>
      {props.children}
    </DocumentsContext.Provider>
  )
}

export { useDocumentsProvider, DocumentsProvider }
