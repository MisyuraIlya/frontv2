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

interface ProductListProps {
  array: Array<IProduct>
  onClick: (product: IProduct) => void
  totalFound: number
  loading: boolean
}

const ProductList: FC<ProductListProps> = ({
  array,
  onClick,
  totalFound,
  loading,
}) => {
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
      {loading ? (
        <Box sx={{ display: 'flex', height: '300px' }} className="centered">
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
          >
            <Button variant="outlined">
              {'מעבר לכל ה ( ' + totalFound + ' ) תוצאות'}
            </Button>
          </ListItem>
        </List>
      )}
    </Paper>
  )
}

export default ProductList
