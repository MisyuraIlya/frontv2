import React, { useEffect } from 'react'
import Calendar from 'react-calendar'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocsHead from '../components/DocsHead'
import { useDocumentsProvider } from '../provider/DocumentsProvider'
import DocumentList from '../components/DocumentList'
import Loader from '../../../shared/Loader'

const DocumentsPage = () => {
  const { loading, totalPages, hydraPagination, showCalendar, choosedDate } =
    useDocuments()
  const { handleCalendar } = useDocumentsProvider()
  return (
    <div
      className="page-container history admin-history docs"
      style={{ marginTop: '160px' }}
    >
      <div className="docs-sub-cont">
        {loading && <Loader />}
        <Calendar
          onChange={(date) => handleCalendar(date as Date)}
          value={new Date()}
          locale="he-IL"
          className={showCalendar ? 'active' : null}
        />
        <DocsFilter />
        <DocumentList />
        <Pagination hydraPagination={hydraPagination} />
      </div>
    </div>
  )
}

export default DocumentsPage
