import React, { useEffect } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import DocumentCardList from '../components/DocumentCardList'
import DocsFilter from '../components/DocsFilter'
import { useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import Loader from '../../../shared/Loader'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import moment from 'moment'
const DocumentsItemPage = () => {
  const {
    loadingItemsPage,
    getOrderItems,
    setDocumentType,
    setDocumentId,
    setDocumentItemType,
  } = useDocuments()

  const { id, documentItemType } = useParams()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  useEffect(() => {
    setDocumentType('documentItem')
    setDocumentItemType(documentItemType as DocumentItemTypes)
    if (id) {
      getOrderItems(id)
      setDocumentId(id)
    }
  }, [])
  return (
    <div className="page-container history admin-history docs">
      <div className="docs-sub-cont">
        {loadingItemsPage && <Loader />}
        <BreadCrumbs
          array={[
            {
              title: 'מסמכים',
              link: `/documentPage?page=1&from=${from}&to=${to}`,
            },
            { title: id || '', link: '' },
          ]}
        />
        <DocsFilter />
        <DocumentCardList />
        <DocsTotal />
      </div>
    </div>
  )
}

export default DocumentsItemPage
