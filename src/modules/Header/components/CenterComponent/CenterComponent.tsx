import React from 'react'
import CatalogSearch from '../../../Catalog/components/CatalogSearch/CatalogSearch'
import { Box } from '@mui/material'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import ProductList from '../../../../utils/SearchInput/ProductList'
import { useSearchStore } from '../../../Catalog/store/SearchStore'

const CenterComponent = () => {
  const {
    productsFilter,
    findProductsByValue,
    searchValue,
    totalFound,
    loading,
    setSearchValue,
    setSavedValue,
  } = useSearchStore()

  const onClickHandle = (product: IProduct) => {
    console.log('product', product)
  }

  const handleSetValue = (value: string) => {
    setSearchValue(value)
    setSavedValue(value)
  }

  const onChangeHandle = (valueDebounced: string) => {
    setSearchValue(valueDebounced)
    setSavedValue(valueDebounced)
    findProductsByValue('0', '0', '0', `?search=${valueDebounced}`)
  }

  return (
    <Box sx={{ width: '100%', position: 'relative', zIndex: 10 }}>
      <SearchInput
        value={searchValue}
        setValue={handleSetValue}
        handleFunction={onChangeHandle}
        placeholder="חפש מוצר..."
        ListComponent={
          <ProductList
            onClick={onClickHandle}
            array={productsFilter}
            loading={loading}
            totalFound={totalFound}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        }
      />
    </Box>
  )
}

export default CenterComponent
