import React from 'react'
import DocumentCardList from '../components/DocumentCardList'
import { useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import moment from 'moment'
import DocsItemFilter from '../components/DocsItemFilter'
import { Box, Container, Divider, Grid } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import Loader from '../../../shared/Loader'
import useDataDocumentsItem from '../hook/useDataDocumentsItem'
const DocumentsItemPage = () => {
  const { documentItemType, id } = useParams()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')
  const { isLoading } = useDataDocumentsItem()

  return (
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
    </Grid>
  )
}

export default DocumentsItemPage
