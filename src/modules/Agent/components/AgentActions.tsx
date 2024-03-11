import React, { FC } from 'react'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useCart } from '../../Cart/store/cart.store'
import { useNavigate } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAgentProfileStore } from '../store/agentProfile.store'
import moment from 'moment'
import { onSuccessAlert } from '../../../shared/MySweetAlert'
import { Card, Grid, Typography } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RestorePageIcon from '@mui/icons-material/RestorePage'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'

interface Action {
  title: string
  mode: IDocumentType
  link: string
  img: any
}

interface AgentActionsProps {
  colsNumber: number
}
const AgentActions: FC<AgentActionsProps> = ({ colsNumber }) => {
  const { user } = useAuth()
  const { setSelectedMode } = useCart()
  const navigate = useNavigate()
  const { setAgentOptions } = useModals()
  const { createVisit } = useAgentProfileStore()

  const handleCreateVisit = async () => {
    if (user) {
      let obj: IAgentObjective = {
        agent: user,
        client: user,
        isCompleted: true,
        completedAt: moment().format('YYYY-MM-DD'),
        title: '',
        description: '',
        week1: false,
        week2: false,
        week3: false,
        week4: false,
        hourFrom: moment().subtract(1, 'hour').format('HH'),
        hourTo: moment().format('HH'),
        choosedDay: moment().locale('he').format('dddd'),
        date: moment().format('YYYY-MM-DD'),
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        objectiveType: 'visit',
        subTusk: [],
      }
      // console.log('obj',obj)
      await createVisit(obj)
      onSuccessAlert('ביקור התווסף', '')
    }
  }
  let actions: Action[] = [
    {
      title: 'הזמנה',
      mode: 'order',
      link: '/CatalogView',
      img: <ListAltIcon sx={{ fontSize: '40px' }} />,
    },
    {
      title: 'החזרה',
      mode: 'return',
      link: '/CatalogView',
      img: <RestorePageIcon sx={{ fontSize: '40px' }} />,
    },
    {
      title: 'ה.מחיר',
      mode: 'quote',
      link: '/CatalogView',
      img: <RequestQuoteIcon sx={{ fontSize: '40px' }} />,
    },
  ]
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px', marginBottom: '20px' }}>
        {'פעולות'}
      </Typography>
      <Grid container spacing={30}>
        {actions?.map((item, key) => (
          <Grid
            item
            xs={4}
            onClick={() => {
              setSelectedMode(item.mode)
              navigate(item.link)
              setAgentOptions(false)
            }}
          >
            <Card
              elevation={2}
              sx={{ padding: '30px 50px', gap: '20px', cursor: 'pointer' }}
              className="centered"
            >
              <Typography variant="h6">{item.title}</Typography>
              {item.img}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AgentActions
