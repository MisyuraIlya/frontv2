import React, { useEffect } from 'react'
import DocumentCardList from '../components/DocumentCardList'
import { useNavigate, useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import moment from 'moment'
import DocsItemFilter from '../components/DocsItemFilter'
import { Container } from '@mui/material'
import useSWR from 'swr'
import { DocumentsService } from '../services/document.service'
import { useDocumentsItem } from '../store/DocumentsItemStore'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import Loader from '../../../shared/Loader'
const DocumentsItemPage = () => {
  const { setSwrHandler, setLoading } = useDocumentsItem()

  const { documentItemType, id } = useParams()

  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const navigate = useNavigate()

  const fetchData = async () => {
    return await DocumentsService.GetDocumentsItem(
      documentItemType as IDocumentTypes,
      id!
    )
  }

  const { data, isLoading } = useSWR(
    `api/documents/${documentItemType}/${id}`,
    fetchData
  )

  useEffect(() => {
    setLoading(isLoading)
    if (data) {
      setSwrHandler(
        data.products['hydra:member'],
        data.files['hydra:member'],
        data.totalTax,
        data.totalPriceAfterTax,
        data.totalAfterDiscount,
        data.totalPrecent,
        data.products['hydra:totalItems']
      )
    }
  }, [data])

  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: 'מסמכים',
            link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
          },
          { title: id || '', link: '' },
        ]}
      />
      <DocsItemFilter />
      <DocumentCardList />
      <DocsTotal />
    </Container>
  )
}

export default DocumentsItemPage
