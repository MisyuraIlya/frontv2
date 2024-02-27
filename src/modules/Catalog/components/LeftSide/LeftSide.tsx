import React from 'react'
import ProductList from './components/ProductList/ProductList'
import FiltersBlock from './components/FiltersBlock/FiltersBlock'
import { useParams } from 'react-router-dom'
import { useCatalog } from '../../store/CatalogStore'
import { useSearchStore } from '../../store/SearchStore'
import { Box, Pagination } from '@mui/material'
import PaginationUtil from '../../../../utils/pagination/PaginationUtil'

const LeftSide = () => {
  const { categoriesLvl1, hydraPagination } = useCatalog()
  const { hydraPagination: searchHydraPagination } = useSearchStore()
  const { documentType, lvl1 } = useParams()
  const currentCategory = (categoriesLvl1?.filter(
    (item) => item.id.toString() == lvl1
  ))[0]
  const isSearchDocument = documentType === 'search'
  return (
    <Box>
      {/* {currentCategory?.Id &&
        <Helmet>
            <title>{currentCategory.Title}</title>
            <meta name="keywords" content={currentCategory.Title}/>
            <link rel="canonical" href={entry + '/category/' + currentCategory.ParentId + '/' + currentCategory.Id}/>
            <link rel="alternate" href={entry + '/category/' + currentCategory.ParentId + '/' + currentCategory.Id} hreflang="he-il"/>
        </Helmet>
        } */}

      <FiltersBlock />
      <ProductList />
      <PaginationUtil hydraPagination={hydraPagination} />
    </Box>
  )
}

export default LeftSide
