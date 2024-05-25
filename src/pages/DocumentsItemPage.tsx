import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Box, Divider, Grid } from '@mui/material'
import Loader from '../utils/Loader'
import useDataDocumentsItem from '../hooks/useDataDocumentsItem'
import DocumentItem from '../components/DocumentItem'
import Utils from '../utils'

const DocumentsItemPage = () => {
  const { documentItemType, id } = useParams()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')
  const { isLoading } = useDataDocumentsItem()

  return (
    <>
      <Grid container sx={{ marginTop: '50px' }} spacing={0}>
        <Grid item xs={9}>
          {isLoading && <Loader />}
          <Box sx={{ padding: '0 20px' }}>
            <Utils.BreadCrumbsUtil
              array={[
                {
                  title: 'מסמכים',
                  link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
                },
                { title: id || '', link: '' },
              ]}
            />
          </Box>
          <DocumentItem.Right.Filter />
          <DocumentItem.Right.List />
        </Grid>
        <Grid item xs={3} sx={{ position: 'relative' }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ position: 'fixed', height: '100vh', width: '2px' }}
          />
          <DocumentItem.Left.Summary />
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentsItemPage
