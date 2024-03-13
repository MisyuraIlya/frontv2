import { Box } from '@mui/material'
import React from 'react'
import VisitsList from '../components/VisitsList'

const AgentVisits = () => {
  return (
    <Box>
      <div className="myPadding">
        <div className="flex-container myPadding">
          <div className="col-lg-5 colMobile12 mobileAlign">
            {/* <div className="">
                    <MyInputV2
                      placeholder={'חיפוש לפי לקוח'}
                      value={searchValue}
                      onChange={setSearchValue}
                    />
                  </div> */}
          </div>
        </div>
      </div>
      <div className="myPadding">
        <VisitsList />
      </div>
      <div className="myMarginTop">
        {/* <Pagination hydraPagination={hydraPagination} /> */}
      </div>
    </Box>
  )
}

export default AgentVisits
