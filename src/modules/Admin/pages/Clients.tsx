import React, { useEffect } from 'react'
import ClientsFilter from '../components/Clients/ClientsFilter'
import ClientsList from '../components/Clients/ClientsList'
import { useClientStore } from '../store/ClientsStore'
import Pagination from '../../../shared/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import BreadCrumbs from '../../../shared/BreadCrumbs'

const Clients = () => {
  const { getClients, hydraPagination, setPage } = useClientStore()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const page = urlSearchParams.get('page')
    const updatedUrl = '?' + urlSearchParams.toString()
    if (page) {
      setPage(page?.toString())
    }
    navigate(location.pathname + updatedUrl)
    getClients()
  }, [location.search])
  return (
    <div className="page-container clients">
      <div className="wrapper container">
        <div>
          <BreadCrumbs array={[]} />
        </div>
        <h1 className="title">לקוחות</h1>
        <ClientsFilter />
        <ClientsList />
        <Pagination hydraPagination={hydraPagination} />
      </div>
    </div>
  )
}

export default Clients
