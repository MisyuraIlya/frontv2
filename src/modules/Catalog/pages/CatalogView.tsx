import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import useDataCategories from '../hook/useDataCategories'

const CatalogView = () => {
  const { data } = useDataCategories()
  const { lvl1 } = useParams()
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: '200px' }}>
        {data?.['hydra:member']?.map((element: ICategory, index) => {
          if (element?.parent?.id == lvl1) {
            return (
              <Grid item xs={3} key={index}>
                <Card elevation={0} sx={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '200px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    src={
                      element?.MediaObject?.filePath
                        ? `${process.env.REACT_APP_MEDIA}/category/${element?.MediaObject?.filePath}`
                        : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                    }
                  />
                  <CardContent>
                    <Typography variant="h5">{element?.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>
    </Container>
  )
}

export default CatalogView
