import React, { useEffect } from 'react'
import { useAgentStore } from '../../../Agent/store/agent.store'
import { useAuth } from '../../store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import Loader from '../../../../shared/Loader'
import { numberWithCommas } from '../../../../helpers/numberWithCommas'

const ClientFinance = () => {
  // const {clientFinance,getClientFinance, loading} = useAgentClientStore()
  const { isAgent, isSuperAgent, isAdmin, isClient } = useAuth()
  // const {openDebitModal, setOpenDebitModal} = useNotificationModal()
  // TODO implement
  return (
    <div className="Profile-page-sub col-lg-12">
      {(isAgent || isSuperAgent || isAdmin || !isClient) && (
        <>
          <h1>{'כספים'}</h1>
          <div
            className="Profile-page-sub2"
            style={{ position: 'relative', minHeight: '100px' }}
          >
            {/* {loading ?
                            <Loader/>
                            :
                            <div className="col-lg-12 box-cont box-cont-agent-mode">
                                {user?.PriceListBase &&
                                    <div className="col">
                                        <p className="title">{'מחירון'}</p>
                                        <p className="value">{user?.PriceListBase}</p>
                                    </div>
                                }
                                {user?.PaymentMethod &&
                                    <div className="col">
                                        <p className="title">{'מחירון'}</p>
                                        <p className="value">{user?.PaymentMethod}</p>
                                    </div>
                                }
                                <div className="col">
                                    <p className="title">{' הזמנות פתוחות'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.OrderDebit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'תעודות שלא חויבו'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.DocumentDebit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'חשבוניות מס זמניות'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.IvDebit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'חוב פתוח'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.AccDebit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{"צ'קים שלא נפרעו"}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.CheQueDebit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'תיקרת האשראי'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.MaxCredit))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'יתרת אשראי'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.CreditRest))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'אובליגו'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.Obligo))}</p>
                                </div>
                                <div className="col">
                                    <p className="title">{'תיקרת האובליגו'}</p>
                                    <p className="value">{numberWithCommas(parseInt(clientFinance?.MaxObligo))}</p>
                                </div>


                                <div className="col">
                                    <p className="title">{'חובות פתוחים'}</p>
                                    <span className="material-symbols-outlined" 
                                    onClick={() => setOpenDebitModal(true)}
                                    >
                                    account_balance_wallet
                                    </span>
                                </div>
                
                            </div>
                        } */}
          </div>
        </>
      )}
    </div>
  )
}

export default ClientFinance
