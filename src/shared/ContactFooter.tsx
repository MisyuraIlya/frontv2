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
} from '@mui/material'
import { themeColors } from '../styles/mui'

const ContactFooter = () => {
  return (
    <Box sx={{ backgroundColor: themeColors.primary }}>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <Box>
              <Typography variant="h4" color={'white'}>
                {'אודותינו'}
              </Typography>
              <Typography variant="body2" color={'white'}>
                מדי-מרקט הינה החברה המובילה בתחום יבוא והפצת מגוון רחב של
                תרופות, ציוד רפואי ומכשור רפואי עבור מגוון רחב של מוסדות
                רפואיים.
              </Typography>
              <Typography variant="body2" color={'white'}>
                למדי-מרקט רישיון משרד הבריאות לניהול בית מרקחת ובית מסחר
                לתרופות. החברה הינה בעלת תקן אירופאי GMP, GDP, בעלת אישור משרד
                הבריאות ומפעילה מרכז הכנות לרקיחת הכנות מיוחדות (נוהל 132 ונוהל
                135) וכמו כן מאושרת החברה לתקן ISO9001.
              </Typography>
              <Typography variant="body2" color={'white'}>
                הובלה ברכבים מבוקרי טמפרטורות בהתאם להוראות ה-GDP המחמירות, תוך
                פיקוח הדוק וקפדני של רוקחים אחראיים המבקרים את ההובלה באמצעים
                טכנולוגיים משוכללים על מנת להבטיח את הספקת התרופות במהירות
                ובאחריות תוך שמירה על תנאי הובלה נאותים.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box>
              <TextField label="שם" fullWidth />
              <TextField label="מייל" fullWidth />
              <TextField label="טלפון" fullWidth />
              <TextareaAutosize placeholder="הודעה" style={{ width: '100%' }} />
              <Button variant="contained" color="primary">
                {'שלח'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box>
              <List>
                <ListItem>
                  <Typography variant="h6">{'כתובת:'}</Typography>
                  <Typography color={'white'} variant="body1">
                    הקטיף 3, פארק תעשיות עמק חפר
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">{'טלפון:'}</Typography>
                  <Typography color={'white'} variant="body1">
                    09-8844452
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">{'אימייל:'}</Typography>
                  <Typography color={'white'} variant="body1">
                    humane-info@medi-market.co.il
                  </Typography>
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
