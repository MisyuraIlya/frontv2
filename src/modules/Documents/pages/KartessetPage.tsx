import React, { useEffect } from 'react'
import Calendar from 'react-calendar'
import Pagination from '../../../shared/Pagination'
import { useDocuments } from '../store/DocumentsStore'
import DocsFilter from '../components/DocsFilter'
import DocsHead from '../components/DocsHead'
import { useDocumentsProvider } from '../provider/DocumentsProvider'
import KartessetLst from '../components/KartessetLst'
import Loader from '../../../shared/Loader'

const KartessetPage = () => {
  const { loading, totalPages, hydraPagination, showCalendar, choosedDate } =
    useDocuments()
  const { handleCalendar } = useDocumentsProvider()
  return (
    <div className="page-container history admin-history docs ">
      <div className="docs-sub-cont">
        {loading && <Loader />}
        <Calendar
          onChange={(date) => handleCalendar(date as Date)}
          value={choosedDate ? new Date(choosedDate) : null}
          locale="he-IL"
          className={showCalendar ? 'active' : null}
        />
        <DocsFilter />
        <KartessetLst />
        <Pagination hydraPagination={hydraPagination} />
      </div>
    </div>
  )
}

export default KartessetPage
