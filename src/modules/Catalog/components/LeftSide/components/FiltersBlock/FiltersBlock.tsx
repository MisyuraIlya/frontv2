import React, { useEffect } from 'react'
import { useCatalog } from '../../../../store/CatalogStore'
import { useAuth } from '../../../../../Auth/store/useAuthStore'
import { useDebounce } from 'use-debounce'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { themeColors } from '../../../../../../styles/mui'

import CloseIcon from '@mui/icons-material/Close'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import WindowIcon from '@mui/icons-material/Window'
const FiltersBlock = () => {
  const {
    prodsPerPage,
    setProdsPerPage,
    activeProdsPerPage,
    setActiveProdsPerPage,
    activeSortPerPage,
    setActiveSortPerPage,
    sortProdSetting,
    setSortProdSetting,
    listView,
    setListView,
    searchParam,
    setSearchParam,
    getCatalog,
    totalItems,
    setSearchParams,
  } = useCatalog()

  const location = useLocation()
  const navigate = useNavigate()
  const [searchDebounce] = useDebounce(searchParam, 1000)

  const handleOrderBy = (val: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('orderBy', val)
    const updatedUrl = '?' + urlSearchParams.toString()
    setSearchParams(updatedUrl)
    navigate(location.pathname + updatedUrl)
    if (val == '1') {
      setSortProdSetting('1', 'שם')
    } else if (val == '2') {
      setSortProdSetting('2', 'מק״ט')
    } else if (val == '3') {
      setSortProdSetting('3', 'מומלץ')
    }
    setActiveSortPerPage(false)
  }

  const handleChangeItemsPerPage = (number: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('itemsPerPage', number)
    urlSearchParams.set('page', '1')
    const updatedUrl = '?' + urlSearchParams.toString()
    setProdsPerPage(updatedUrl, number)
    navigate(location.pathname + updatedUrl)
  }

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    if (value) {
      urlSearchParams.set('search', value)
    } else {
      urlSearchParams.delete('search')
      setSearchParam('')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    setSearchParams(updatedUrl)
    navigate(location.pathname + updatedUrl)
  }

  useEffect(() => {
    handleSearchValue(searchDebounce)
  }, [searchDebounce])

  const handleChange = (event: SelectChangeEvent) => {
    handleChangeItemsPerPage(event.target.value)
  }

  const handleChangeOrdern = (event: SelectChangeEvent) => {
    handleOrderBy(event.target.value)
  }

  const arrOrden = [
    { value: '1', label: 'שם' },
    { value: '2', label: 'מק״ט' },
    { value: '3', label: 'מומלץ' },
  ]

  const arrProdsPerPage = ['2', '24', '48']

  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderBottom: '1px solid rgba(65, 67, 106, 0.2117647059)',
        borderTop: '1px solid rgba(65, 67, 106, 0.2117647059)',
      }}
    >
      <Grid
        item
        xs={2}
        className="centered"
        sx={{ paddingTop: '0px !important' }}
      >
        <Typography variant="body1" color={themeColors.primary}>
          {'נמצאו: ' + totalItems + ' מוצרים'}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        className="centered"
        sx={{ paddingTop: '0px !important' }}
      >
        <TextField
          placeholder="חיפוש מוצר.."
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          sx={{
            border: '1px solid gray',
            borderRadius: '4px',
            padding: '0',
            '& input': {
              padding: '7px 10px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                {searchParam ? (
                  <CloseIcon onClick={() => setSearchParam('')} />
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid
        item
        xs={2}
        className="centered"
        sx={{ paddingTop: '0px !important' }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
        >
          מוצרים:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select value={prodsPerPage} onChange={handleChange}>
            {arrProdsPerPage?.map((item, key) => (
              <MenuItem key={key} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={2}
        className="centered"
        sx={{ paddingTop: '0px !important' }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
        >
          מיון:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select value={sortProdSetting.value} onChange={handleChangeOrdern}>
            {arrOrden?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={2}
        className="centered"
        sx={{ paddingTop: '0px !important', display: 'flex' }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
          sx={{ paddingRight: '5px' }}
        >
          תצוגה:
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <IconButton
            style={{
              border: listView
                ? '1px solid rgba(65, 67, 106, 0.2117647059)'
                : '',
              borderRadius: '0px',
              padding: '7px',
            }}
            onClick={() => setListView(true)}
          >
            <WindowIcon sx={{ fontSize: '25px' }} />
          </IconButton>
          <IconButton
            style={{
              border: !listView
                ? '1px solid rgba(65, 67, 106, 0.2117647059)'
                : '',
              borderRadius: '0px',
              padding: '7px',
            }}
            onClick={() => setListView(false)}
          >
            <FormatListBulletedIcon sx={{ fontSize: '25px' }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FiltersBlock
