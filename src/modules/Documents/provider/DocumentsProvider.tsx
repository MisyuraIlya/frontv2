// Global
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// Local
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
import { useModals } from '../../Modals/provider/ModalProvider'

interface DocumentsContextType {
  handleCalendar: (date: 'from' | 'to') => void
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
  const { setPage, getItems, setDocumentType } = useDocuments()

  const navigate = useNavigate()
  const location = useLocation()
  const { calendarHandler, currentDate } = useModals()
  const isDocumentPage = location.pathname.includes('documentPage')
  const isKartessetPage = location.pathname.includes('kartessetPage')
  const isHistoryPage = location.pathname.includes('historyPage')

  const [type, setType] = useState<'from' | 'to' | null>(null)
  const dateFrom = location.pathname.split('/')[3]
  const dateTo = location.pathname.split('/')[4]

  const handleCalendar = (type: 'from' | 'to') => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.get('page')
    setType(type)
    if (type === 'from' && dateFrom) {
      calendarHandler(new Date(dateFrom))
      // setDateFrom(date)
      // urlSearchParams.set('from', moment(date).format('YYYY-MM-DD'))
      // urlSearchParams.get('to')
    }
    if (type === 'to' && dateTo) {
      calendarHandler(new Date(dateTo))
      // setDateTo(date)
      // urlSearchParams.set('to', moment(date).format('YYYY-MM-DD'))
      // urlSearchParams.get('from')
    }
    // const updatedUrl = '?' + urlSearchParams.toString()
    // navigate(updatedUrl)
    // setShowCalendar(false)
  }

  useEffect(() => {
    if (type === 'from') {
      const updatedPathname = `/documentPage/erp/${moment(currentDate).format('YYYY-MM-DD')}/${dateTo}`
      navigate(updatedPathname)
    }

    if (type === 'to') {
      const updatedPathname = `/documentPage/erp/${dateFrom}/${moment(currentDate).format('YYYY-MM-DD')}`
      navigate(updatedPathname)
    }
    // const urlSearchParams = new URLSearchParams(location.search)
    // const page = urlSearchParams.get('page')
    // const from = urlSearchParams.get('from')
    // const to = urlSearchParams.get('to')
    // setPage(page!)
    // if (from) {
    //   setDateFrom(new Date(from))
    // }
    // if (to) {
    //   setDateTo(new Date(to))
    // }
    // if (isDocumentPage) {
    //   setDocumentType('document')
    // }
    // if (isKartessetPage) {
    //   setDocumentType('kartesset')
    // }
    // if (isHistoryPage) {
    //   setDocumentType('history')
    // }
    // getItems()
  }, [currentDate])

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
