import React, { useEffect } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import DocumentCardList from '../components/DocumentCardList'
import DocsFilter from '../components/DocsFilter'
import { useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import Loader from '../../../shared/Loader'
import BreadCrumbs from '../../../shared/BreadCrumbs'
import moment from 'moment'
import DocsItemFilter from '../components/DocsItemFilter'
import { Container } from '@mui/material'
import useSWR from 'swr'
import { DocumentsService } from '../services/document.service'
import { useDocumentsItem } from '../store/DocumentsItemStore'
const DocumentsItemPage = () => {
  // const {
  //   loadingItemsPage,
  //   getOrderItems,
  //   setDocumentType,
  //   setDocumentId,
  //   setDocumentItemType,
  // } = useDocuments()

  const { setOrderItems, setFilesOrder, setLoading } = useDocumentsItem()

  const { documentItemType, id } = useParams()

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
      console.log('fetchedData', data)
      setOrderItems(data.products['hydra:member'])
      setFilesOrder(data.files['hydra:member'])
    }
  }, [data])
  // let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  // let to = moment().format('YYYY-MM-DD')

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
      {/* {loadingItemsPage && <Loader />} */}
      {/* <BreadCrumbs
        array={[
          {
            title: 'מסמכים',
            link: `/documentPage?page=1&from=${from}&to=${to}`,
          },
          { title: id || '', link: '' },
        ]}
      /> */}
      <DocsItemFilter />
      <DocumentCardList />
      {/* <DocsTotal /> */}
    </Container>
  )
}

export default DocumentsItemPage
