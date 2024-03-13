import React from 'react'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useAuth } from '../../Auth/store/useAuthStore'
import { Link, useLocation, useParams } from 'react-router-dom'
import useDataAgents from '../hooks/useDataAgents'
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

const AgentsList = () => {
  // const { agentList } = useAgentProfileStore()
  // const { id } = useParams()
  // const { pathname } = useLocation()
  // const page = pathname.split('/')[1]
  const { data } = useDataAgents()
  return (
    <>
      <List sx={{ width: '100%' }}>
        {data?.['hydra:member']?.map((item, index) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.phone}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* <div className="agentsListMainCont">
        <div className="AgentsList">
          <div className="MyDivider"></div>
          <div className="AgentsListCont">
            {agentList && agentList.length
              ? agentList.map((item, index) => {
                  return (
                    <Link key={index} to={`/${page}/${item.id}`}>
                      <div
                        className={item?.id === Number(id) ? 'set-border' : ''}
                      >
                        <div
                          className={
                            item?.id === Number(id)
                              ? 'AgentsListContRow active'
                              : 'AgentsListContRow'
                          }
                        >
                          <p>{'#' + item.extId}</p>
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              : null}
          </div>
        </div>
      </div> */}
    </>
  )
}

export default AgentsList
