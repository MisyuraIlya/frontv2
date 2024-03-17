import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import React, { FC, useState } from 'react'
import SearchInput from './SearchInput'
import useSWR from 'swr'
import { userService } from '../../modules/Auth/services/user.service'

interface SearchUserListProps {
  onClick: (user: IUser) => void
}

const SearchUserList: FC<SearchUserListProps> = ({ onClick }) => {
  const [search, setSearch] = useState('')

  const fetchData = async (): Promise<UsersResponse> => {
    return await userService.getUsers(search)
  }

  const handleClick = (user: IUser) => {
    setSearch(user.name)
    onClick(user)
  }

  const { data, isLoading } = useSWR<UsersResponse>(
    `/api/users?search=${search}`,
    () => fetchData(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return (
    <SearchInput
      value={search}
      setValue={setSearch}
      placeholder="חפש לקוח"
      ListComponent={
        <Paper
          elevation={2}
          sx={{
            height: '300px',
            overflow: 'auto',
            position: 'absolute',
            width: '100%',
            zIndex: 10,
          }}
        >
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            {isLoading ? (
              <Box
                sx={{ display: 'flex', height: '300px' }}
                className="centered"
              >
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {data?.['hydra:member'].map((element, index) => {
                  return (
                    <ListItem
                      key={index}
                      sx={{ background: 'white' }}
                      onClick={() => handleClick(element)}
                    >
                      <ListItemButton sx={{ display: 'flex', gap: '20px' }}>
                        <ListItemText
                          primary={element.extId}
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {element.name}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Box>
        </Paper>
      }
    />
  )
}

export default SearchUserList
