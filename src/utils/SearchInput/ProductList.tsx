import {
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
}

const ProductList: FC<ProductListProps> = ({ array, onClick }) => {
  return (
    <List sx={{ position: 'absolute', width: '100%' }}>
      {array.map((element, index) => (
        <Paper elevation={2}>
          <ListItem
            key={index}
            sx={{ background: 'white' }}
            onClick={() => onClick(element)}
          >
            <ListItemButton sx={{ display: 'flex', gap: '20px' }}>
              <img
                src={
                  process.env.REACT_APP_MEDIA +
                  '/product/' +
                  element?.defaultImagePath
                }
                alt={`Product: ${element.title}`}
                style={{ maxWidth: '50px', maxHeight: '50px' }}
              />

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
        </Paper>
      ))}
    </List>
  )
}

export default ProductList
