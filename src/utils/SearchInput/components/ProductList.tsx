import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { themeColors } from '../../../styles/mui'

interface ProductListProps {
  array: Array<IProduct>
  onClick: (product: IProduct) => void
  totalFound: number
  loading: boolean
  searchValue: string
  setSearchValue: (value: string) => void
}

const ProductList: FC<ProductListProps> = ({
  array,
  onClick,
  totalFound,
  loading,
  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate()
  return (
    <Paper
      elevation={2}
      sx={{
        height: '300px',
        overflow: 'auto',
        position: 'absolute',
        width: '100%',
      }}
    >
      <Box sx={{ height: '80%', overflow: 'auto' }}>
        {!loading && array.length === 0 && (
          <Box className="centered" sx={{ height: '80%' }}>
            <Typography variant="h6" color={themeColors.primary}>
              לא נמצאו מוצרים
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box className="centered">
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {array.map((element, index) => {
              if (index < 20) {
                return (
                  <ListItem
                    key={index}
                    sx={{ background: 'white' }}
                    onClick={() => onClick(element)}
                  >
                    <ListItemButton sx={{ display: 'flex', gap: '20px' }}>
                      {!element?.defaultImagePath ? (
                        <img
                          src={process.env.REACT_APP_MEDIA + '/placeholder.jpg'}
                          alt={`placeholder`}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      ) : (
                        <img
                          src={
                            process.env.REACT_APP_MEDIA +
                            '/product/' +
                            element?.defaultImagePath
                          }
                          alt={`Product: ${element.title}`}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      )}

                      <ListItemText
                        primary={element.title}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              מחיר: ${element.finalPrice}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                )
              }
            })}
            <ListItem
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></ListItem>
          </List>
        )}
      </Box>

      <Box sx={{ height: '10%', marginTop: '15px' }} className="centered">
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/client/catalog/0/0/0?page=1&search=${searchValue}`)
            setSearchValue('')
          }}
        >
          {'מעבר לכל ה ( ' + totalFound + ' ) תוצאות'}
        </Button>
      </Box>
    </Paper>
  )
}

export default ProductList
