import React from 'react'
import DocumentCardList from '../modules/Documents/components/DocumentCardList'
import { useParams } from 'react-router-dom'
import DocsTotal from '../modules/Documents/components/DocsTotal'
import moment from 'moment'
import DocsItemFilter from '../modules/Documents/components/DocsItemFilter'
import { Box, Container, Divider, Grid } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Loader from '../shared/Loader'
import useDataDocumentsItem from '../hooks/useDataDocumentsItem'
import DocumentItem from '../components/DocumentItem'
import Documents from '../components/Documents'

const DocumentsItemPage = () => {
  const { documentItemType, id } = useParams()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')
  const { isLoading } = useDataDocumentsItem()

  return (
    <>
      {/* 
    <Grid container sx={{ marginTop: '50px' }} spacing={0}>
      <Grid item xs={9}>
        {isLoading && <Loader />}
        <Box sx={{ padding: '0 20px' }}>
          <BreadCrumbsUtil
            array={[
              {
                title: 'מסמכים',
                link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
              },
              { title: id || '', link: '' },
            ]}
          />
        </Box>
        <DocsItemFilter />
        <DocumentCardList />
      </Grid>
      <Grid item xs={3} sx={{ position: 'relative' }}>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ position: 'fixed', height: '100vh', width: '2px' }}
        />
        <DocsTotal />
      </Grid>
    </Grid> */}
      <Grid container sx={{ marginTop: '50px' }} spacing={0}>
        <Grid item xs={9}>
          {isLoading && <Loader />}
          <Box sx={{ padding: '0 20px' }}>
            {/* <BreadCrumbsUtil
            array={[
              {
                title: 'מסמכים',
                link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
              },
              { title: id || '', link: '' },
            ]}
          /> */}
          </Box>
          <DocumentItem.Right.Filter />
          <DocumentItem.Right.Head />
          <DocumentItem.Right.List />
        </Grid>
        <Grid item xs={3} sx={{ position: 'relative' }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ position: 'fixed', height: '100vh', width: '2px' }}
          />
          <DocumentItem.Left.Summary />
          {/* <DocsTotal /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentsItemPage
