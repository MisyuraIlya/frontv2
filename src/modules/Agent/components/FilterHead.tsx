import React, { useEffect, useState } from 'react'
import { useAgentStore } from '../store/agent.store'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useDebounce } from 'use-debounce'
import SearchInput from '../../../shared/SearchInput'

const FilterHead = () => {
  const { searchValue, setSearchValue, getClients } = useAgentStore()
  const [active, setActive] = useState(false)
  const { setOpenAuthModal, openAuthModal } = useModals()
  const [valueDebounced] = useDebounce(searchValue, 1000)
  const { setAction } = useAuth()

  const handleCreateUser = async () => {
    setAction('registerNewClient')
    setOpenAuthModal(true)
    getClients()
  }
  useEffect(() => {
    if (active && valueDebounced) {
      getClients()
    }
    if (valueDebounced == '') {
      getClients()
    }
  }, [valueDebounced])

  return (
    <div className="clientsAgentSearchWrapper flex-container">
      <div className="col-lg-8">
        <SearchInput
          search={searchValue}
          setSearch={setSearchValue}
          onActive={setActive}
        />
      </div>
      <div
        className="col-lg-4"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'end' }}
      ></div>
    </div>
  )
}

export default FilterHead
