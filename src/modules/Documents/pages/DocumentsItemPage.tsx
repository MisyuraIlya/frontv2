import React, { useEffect } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import DocumentCardList from '../components/DocumentCardList'
import DocsFilter from '../components/DocsFilter'
import { useNavigate, useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import Loader from '../../../shared/Loader'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import moment from 'moment'
import DocsItemFilter from '../components/DocsItemFilter'
import { Breadcrumbs, Container, Link, Typography } from '@mui/material'
import useSWR from 'swr'
import { DocumentsService } from '../services/document.service'
import { useDocumentsItem } from '../store/DocumentsItemStore'
import { Navigate } from 'react-router-dom'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
const DocumentsItemPage = () => {
  // const {
  //   loadingItemsPage,
  //   getOrderItems,
  //   setDocumentType,
  //   setDocumentId,
  //   setDocumentItemType,
  // } = useDocuments()
  const { setSwrHandler, setLoading } = useDocumentsItem()

  const { documentItemType, id } = useParams()

  const navigate = useNavigate()

  const fetchData = async () => {
    return await DocumentsService.GetDocumentsItemNew(
      documentItemType as DocumentItemTypes,
      id!
    )
  }

  const { data, isLoading } = useSWR(
    `api/documents/${documentItemType}?documentItemType=${documentItemType}`,
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
      // setOrderItems(data.products['hydra:member'])
      // setFilesOrder(data.files['hydra:member'])
    }
  }, [data])
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  // useEffect(() => {
  //   setDocumentType('documentItem')
  //   setDocumentItemType(documentItemType as DocumentItemTypes)
  //   if (id) {
  //     getOrderItems(id)
  //     setDocumentId(id)
  //   }
  // }, [])
  return (
    <Container maxWidth="xl">
      <BreadCrumbsUtil
        array={[
          {
            title: 'מסמכים',
            link: `/documentPage/${documentItemType}/${from}/${to}/?page=1`,
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
