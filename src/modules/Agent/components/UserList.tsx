import React from 'react'
import { useAgentStore } from '../store/agent.store'
import { onAsk } from '../../../shared/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Auth/store/useAuthStore'
const UserList = () => {
  const { clients } = useAgentStore()
  const { client, setSelectClient } = useAuth()
  const navigate = useNavigate()

  const handleSelectClient = async (element: IUser) => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלת הקניות יימחקו')
    if (ask) {
      setSelectClient(element)
      navigate('/profile')
    }
  }
  //TODO add user info
  return (
    <div className="clientsAgent-Wrapper">
      <div className="clientsAgent-Heading">
        <div className="flex-container">
          <div className="col-lg-3">
            <div className="wrapp">
              <p>שם לקוח</p>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="wrapp">
              <p>מס' טלפון</p>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="wrapp">
              <p>כתובת</p>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="wrapp">
              <p>עיר</p>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="wrapp">
              <p>סטאטוס</p>
            </div>
          </div>
        </div>
      </div>
      <div className="clientsAgentBody">
        {clients?.map((element, index) => {
          return (
            <div
              key={index}
              className="flex-container user-row"
              onClick={() => handleSelectClient(element)}
            >
              <div className="col-lg-3 num-col col-cls">
                <div className="wrapp">
                  <p>{element?.name}</p>
                </div>
              </div>
              <div className="col-lg-2 name-col col-cls">
                <div className="wrapp">
                  <p>{element?.phone}</p>
                </div>
              </div>
              {/* <div className="col-lg-2 type-col col-cls">
                                <div className="wrapp">
                                    <p>{element?.address}</p>

                                </div>
                            </div>
                            <div className="col-lg-2 type-col col-cls">
                                <div className="wrapp">
                                    <p>{element?.town}</p>
                                </div>
                            </div> */}

              <div className="col-lg-1 status col-cls">
                <div className="wrapp">
                  {element?.isBlocked && <p className="Blocked">חסום</p>}
                  {!element?.isBlocked && <p className="Active">פעיל</p>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserList
