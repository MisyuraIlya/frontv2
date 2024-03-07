import React, { FC, useState } from 'react'
import { useNotificationStore } from '../../store/notificationStore'
import moment from 'moment'
import UserSelection from './UserSelection'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  RadioGroup,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Radio from '@mui/material/Radio'

interface NotificationItemProps {
  element: INotification
  index: number
}
const NotificationItem: FC<NotificationItemProps> = ({ element, index }) => {
  const {
    deleteItem,
    itemToSend,
    sendNotification,
    choosedItem,
    setChoosedItem,
    createItem,
  } = useNotificationStore()
  const [active, setActive] = useState(false)
  return (
    <Accordion key={index} onClick={() => setChoosedItem(element)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img
                src={
                  element?.image?.filePath
                    ? process.env.REACT_APP_MEDIA +
                      '/notifications/' +
                      element?.image?.filePath
                    : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                }
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">{'כותרת ההודעה'}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">{'מלל הודעה'}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">
                {moment(element?.createdAt).format('DD-MM-YYYY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
            מחק
          </Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />}>
            העתק
          </Button>
          <Button variant="outlined" startIcon={<ModeEditIcon />}>
            עדכן
          </Button>
          <Button variant="outlined" startIcon={<SendIcon />} color="success">
            שלח
          </Button>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  בחר מהרשימה
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="כל המשתמשים"
                  />
                  <FormControlLabel
                    value="listPrice"
                    control={<Radio />}
                    label="לקוחות לפי קוד מיון"
                  />
                  <FormControlLabel
                    value="userExId"
                    control={<Radio />}
                    label="לפי מספר לקוח"
                  />
                  <FormControlLabel
                    value="agentClients"
                    control={<Radio />}
                    label="לקוחות לפי סוכן"
                  />
                  <FormControlLabel
                    value="allAgents"
                    control={<Radio />}
                    label="כל הסוכנים"
                  />
                  <FormControlLabel
                    value="agentExId"
                    control={<Radio />}
                    label="לפי סוכן"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Box>
      </AccordionDetails>
      <div className="flex-container">
        <div className="col-lg-2 actions-cont">
          <div className="wr actions">
            {element?.title && element?.description && (
              <div onClick={() => createItem(element)}>
                <span className="material-symbols-outlined">content_copy</span>
              </div>
            )}
            {!element.isPublic && (
              <>
                {element.title && element.description && (
                  <div>
                    {active ? (
                      <span
                        onClick={() => setActive(false)}
                        className="material-symbols-outlined"
                      >
                        close
                      </span>
                    ) : (
                      <span
                        onClick={() => setActive(true)}
                        className="material-symbols-outlined"
                      >
                        send
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {active && (
        <div className="select-group">
          <h2>בחר מרשימה</h2>
          <div className="select-group-wrapper">
            <div>
              <UserSelection id={1} title={'לכולם'} />
              <UserSelection id={2} title={'לפי לקוחות'} />
              <button
                className={'buttonDisabled'}
                onClick={() => sendNotification()}
              >
                <span>שלח</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Accordion>
  )
}

export default NotificationItem
