import React, { useEffect } from 'react'
import { useAgentStore } from '../store/agent.store'
import Pagination from '../../../shared/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import FilterHead from '../components/FilterHead'
import UserList from '../components/UserList'
import Loader from '../../../shared/Loader'

const AgentClinets = () => {
  const { loading, getClients, setPage, hydraPagination } = useAgentStore()

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const page = urlSearchParams.get('page')
    const updatedUrl = '?' + urlSearchParams.toString()
    if (page) {
      setPage(page)
    }
    navigate(location.pathname + updatedUrl)
    getClients(true)
  }, [location.search])
  return (
    <div className="page-container ClientsAgent">
      {loading && <Loader />}
      <div className="clients-wrapper">
        <FilterHead />
        <UserList />
        <Pagination hydraPagination={hydraPagination} />
      </div>
    </div>
  )
}

export default AgentClinets
