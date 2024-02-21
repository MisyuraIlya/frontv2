import React, { FC } from 'react'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useCart } from '../../Cart/store/cart.store'
import { useNavigate } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAgentProfileStore } from '../store/agentProfile.store'
import moment from 'moment'
import { onSuccessAlert } from '../../../shared/MySweetAlert'

interface Action {
  title: string
  mode: IDocumentType
  link: string
  img: string
}

interface AgentActionsProps {
  colsNumber: number
}
const AgentActions: FC<AgentActionsProps> = ({ colsNumber }) => {
  const { isAgent, user, client } = useAuth()
  const { setSelectedMode } = useCart()
  const navigate = useNavigate()
  const { setAgentOptions } = useModals()
  const { createVisit } = useAgentProfileStore()

  const handleCreateVisit = async () => {
    if (user && client) {
      let obj: IAgentObjective = {
        agent: user,
        client: client,
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
      img: 'list_alt',
    },
    // {
    //   title: 'החזרה',
    //   mode: 'return',
    //   link: '/CatalogView',
    //   img: 'history',
    // },
    {
      title: 'ה.מחיר',
      mode: 'quote',
      link: '/CatalogView',
      img: 'request_quote',
    },
  ]
  return (
    <>
      <div className="agent-actions-main-cont">
        <div className="agent-actions-sub-cont">
          <div
            className="Profile-slide-menu-cont"
            style={{ paddingTop: '40px' }}
          >
            <h1>{'פעולות'}</h1>
            <div className="btns-cont flex-container">
              {actions?.map((item, key) => (
                <div className={`col-lg-${colsNumber}`} key={key}>
                  <div
                    className="Profile-slide-sub"
                    onClick={() => {
                      setSelectedMode(item.mode)
                      navigate(item.link)
                      setAgentOptions(false)
                    }}
                    style={{ margin: '5px' }}
                  >
                    <div className="Profile-slide-box">
                      <span className="material-symbols-outlined search-img">
                        {item.img}
                      </span>
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
              <div className={`col-lg-${colsNumber}`}>
                <div
                  className="Profile-slide-sub"
                  style={{ margin: '5px' }}
                  onClick={() => {
                    handleCreateVisit()
                    setAgentOptions(false)
                  }}
                >
                  <div className="Profile-slide-box">
                    <span className="material-symbols-outlined search-img">
                      {'tour'}
                    </span>
                    <h2>{'קריאת שירות'}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgentActions
