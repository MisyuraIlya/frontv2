import React, { useEffect, useState } from 'react'
import { useCatalog } from '../../../store/CatalogStore'
import { useDebounce } from 'use-debounce'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'

import useDataCatalog from '../../../hooks/useDataCatalog'
import GridViewIcon from '@mui/icons-material/GridView'
import TocIcon from '@mui/icons-material/Toc'
import Utils from '../../../utils'
import CustomSelectBox from '../../../utils/CustomSelectBox'

const Filter = () => {
  const [search, setSearch] = useState<string>('')
  const {
    listView,
    setListView,
    prodsPerPage,
    setProdsPerPage,
    sortProdSetting,
    setSortProdSetting,
    sortArr,
  } = useCatalog()
  const { data } = useDataCatalog()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchDebounce] = useDebounce(search, 1000)
  const arrProdsPerPage = ['2', '24', '48']
  const totalItems = data ? data?.['hydra:totalItems'] : '0'

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    if (value) {
      urlSearchParams.set('search', value)
    } else {
      urlSearchParams.delete('search')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
  }

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('itemsPerPage', event.target.value)
    urlSearchParams.set('page', '1')
    const updatedUrl = '?' + urlSearchParams.toString()
    setProdsPerPage(event.target.value)
    navigate(location.pathname + updatedUrl)
  }

  // const handleOrderBy = (event: SelectChangeEvent) => {
  //   const urlSearchParams = new URLSearchParams(location.search)
  //   urlSearchParams.set('orderBy', event.target.value)
  //   const updatedUrl = '?' + urlSearchParams.toString()
  //   navigate(location.pathname + updatedUrl)
  //   if (event.target.value == '1') {
  //     setSortProdSetting('1', 'שם')
  //   } else if (event.target.value == '2') {
  //     setSortProdSetting('2', 'מק״ט')
  //   } else if (event.target.value == '3') {
  //     setSortProdSetting('3', 'מומלץ')
  //   }
  // }

  const [alignment, setAlignment] = React.useState<string | null>('left')

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }

  useEffect(() => {
    handleSearchValue(searchDebounce)
  }, [searchDebounce])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'space-between',
          height: '44px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Utils.SearchInput
            value={search}
            setValue={setSearch}
            sx={{
              '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '12px',
              },
            }}
            // handleFunction={handleDebounced}
            placeholder="חפש מוצר..."
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <CustomSelectBox
            label="מיון"
            value={sortProdSetting}
            onChange={setSortProdSetting}
            options={sortArr}
          />

          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="grid" aria-label="bold">
              <GridViewIcon
                sx={{ color: alignment == 'grid' ? 'white' : 'black' }}
              />
            </ToggleButton>
            <ToggleButton value="line" aria-label="italic">
              <TocIcon
                sx={{ color: alignment == 'line' ? 'white' : 'black' }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ pt: '18px' }}>
        <CustomSelectBox
          label="מיון"
          value={sortProdSetting}
          onChange={setSortProdSetting}
          options={sortArr}
        />
      </Box>
    </>
  )
}

export default Filter
