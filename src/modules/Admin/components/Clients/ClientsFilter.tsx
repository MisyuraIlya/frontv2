import React, { useEffect, useState } from 'react'
import { useClientStore } from '../../store/ClientsStore'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import SearchInput from '../../../../shared/SearchInput'

const ClientsFilter = () => {
  const { totalClients, search, setSearch, getClients } = useClientStore()
  const [valueDebounced] = useDebounce(search, 1000)
  const [activeSearch, setActiveSearch] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (activeSearch) {
      getClients()
    }
    if (!search) {
      getClients()
    }
  }, [valueDebounced])
  return (
    <div className="filter flex-container">
      <div className="col-lg-2">
        <p>{'נמצאו ' + totalClients + ' לקוחות'}</p>
      </div>
      <div style={{ display: 'flex' }} className="col-lg-10">
        <div className="col-lg-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            onActive={setActiveSearch}
          />
        </div>

        <div className="col-lg-7">
          <ul
            className="filter-ul"
            style={{
              backgroundImage:
                'url(' + process.env.REACT_APP_MEDIA + '/icons/filter.svg)',
            }}
          >
            {/* HERE FILTER BY SOMETHING */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ClientsFilter
