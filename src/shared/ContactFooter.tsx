import React from 'react'
import {
  Container,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { themeColors } from '../styles/mui'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

const ContactFooter = () => {
  return (
    <Box sx={{ backgroundColor: themeColors.primary }}>
      <Container maxWidth="xl">
        <Grid container spacing={12}>
          <Grid item xs={12} lg={5}>
            <Box sx={{ color: 'white' }}>
              <Typography variant="h4">{'אודותינו'}</Typography>
              <Typography variant="body2">
                מדי-מרקט הינה החברה המובילה בתחום יבוא והפצת מגוון רחב של
                תרופות, ציוד רפואי ומכשור רפואי עבור מגוון רחב של מוסדות
                רפואיים.
              </Typography>
              <Typography variant="body2">
                למדי-מרקט רישיון משרד הבריאות לניהול בית מרקחת ובית מסחר
                לתרופות. החברה הינה בעלת תקן אירופאי GMP, GDP, בעלת אישור משרד
                הבריאות ומפעילה מרכז הכנות לרקיחת הכנות מיוחדות (נוהל 132 ונוהל
                135) וכמו כן מאושרת החברה לתקן ISO9001.
              </Typography>
              <Typography variant="body2">
                הובלה ברכבים מבוקרי טמפרטורות בהתאם להוראות ה-GDP המחמירות, תוך
                פיקוח הדוק וקפדני של רוקחים אחראיים המבקרים את ההובלה באמצעים
                טכנולוגיים משוכללים על מנת להבטיח את הספקת התרופות במהירות
                ובאחריות תוך שמירה על תנאי הובלה נאותים.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box>
              <TextField
                id="outlined-basic"
                label="שם"
                fullWidth
                variant="filled"
                sx={{
                  color: 'white',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white',
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                id="outlined-basic"
                label="מייל"
                fullWidth
                variant="filled"
                sx={{
                  color: 'white',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white',
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                id="outlined-basic"
                label="טלפון"
                fullWidth
                variant="filled"
                sx={{
                  color: 'white',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white',
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <TextareaAutosize
                placeholder="הודעה"
                style={{
                  width: '100%',
                  color: 'white',
                  backgroundColor: themeColors.primary,
                }}
              />
              <Button variant="contained" color="secondary">
                {'שלח'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box sx={{ '& .MuiTypography-root': { color: 'white' } }}>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <BusinessIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="כתובת:"
                    secondary={'הקטיף 3, פארק תעשיות עמק חפר'}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PhoneEnabledIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="טלפון:" secondary={'09-8844452'} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <AlternateEmailIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="אימייל:"
                    secondary={'humane-info@medi-market.co.il'}
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactFooter
