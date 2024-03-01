import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../../../Catalog/store/CategoriesStore'
import { checkIsBlockedForView } from '../../../Catalog/helpers/checkIsBlockedForView'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  ListItemButton,
} from '@mui/material'
import { themeColors } from '../../../../styles/mui'

const CategoryNavBar = () => {
  const { categories, getCategories } = useCategories()
  const [active, setActive] = useState<number>(0)
  const navigate = useNavigate()

  const handlePush = (
    lvl1: ICategory,
    lvl2: ICategory,
    currentItem: ICategory
  ) => {
    if (currentItem.lvlNumber === 2) {
      const check = checkIsBlockedForView(currentItem)
      if (!check) {
        navigate(`/client/catalog/${lvl1.id}/${lvl2.id}/0`)
      }
    }

    if (currentItem.lvlNumber === 3) {
      const check = checkIsBlockedForView(lvl2)
      if (!check) {
        navigate(`/client/catalog/${lvl1.id}/${lvl2.id}/${currentItem.id}`)
      }
    }
  }

  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
  }, [])

  return (
    <List
      sx={{
        backgroundColor: themeColors.primary,
        color: 'white',
        marginTop: '10px',
      }}
      onMouseLeave={() => setActive(0)}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', position: 'relative' }}>
        {categories?.map((element, index) => {
          if (element.lvlNumber === 1 && element.isPublished) {
            return (
              <>
                <ListItem
                  sx={{
                    height: '30px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  key={index}
                  onMouseEnter={() => setActive(element.id)}
                >
                  <ListItemText
                    primary={element?.title}
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      navigate(`/client/catalog/${element.id}/0/0?page=1`)
                    }
                  />
                </ListItem>
                {active == element.id && (
                  <Paper
                    elevation={4}
                    sx={{
                      minHeight: '200px',
                      maxHeight: '400px',
                      overflow: 'auto',
                      position: 'absolute',
                      width: '100%',
                      top: '38px',
                    }}
                    onMouseEnter={() => setActive(element.id)}
                    onMouseLeave={() => setActive(0)}
                  >
                    <Grid container spacing={2} sx={{ padding: '20px' }}>
                      {element?.categories &&
                        element.categories.length > 0 &&
                        element.categories?.map((lvl2, key) => {
                          return (
                            <Grid item xs={3} key={key}>
                              <Typography
                                variant="body1"
                                fontWeight={900}
                                color={themeColors.primary}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handlePush(element, lvl2, lvl2)}
                              >
                                {lvl2.title}
                              </Typography>
                              <List sx={{ margin: '0', padding: '0' }}>
                                {lvl2?.categories?.map((lvl3, key2) => (
                                  <ListItem
                                    key={key2}
                                    sx={{ margin: '0', padding: '0' }}
                                  >
                                    <ListItemButton
                                      sx={{ margin: '0', padding: '0' }}
                                    >
                                      <ListItemText
                                        primary={lvl3?.title}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                          handlePush(element, lvl2, lvl3)
                                        }
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>
                          )
                        })}
                    </Grid>
                  </Paper>
                )}
              </>
            )
          }
        })}
      </Container>
    </List>
  )
}

export default CategoryNavBar
