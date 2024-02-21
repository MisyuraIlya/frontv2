import React from 'react'
import moment from 'moment'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { onAsk } from '../../../../../shared/MySweetAlert'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../../../Cart/store/cart.store'
import { useModals } from '../../../../Modals/provider/ModalProvider'
import AtarSelection from '../../../../Auth/components/AtarSelection'

const ProfileMenu = ({
  setOpenProfile,
}: {
  setOpenProfile: (value: boolean) => void
}) => {
  const {
    isClient,
    isAgent,
    user,
    isAdmin,
    client,
    logOut,
    setSelectClient,
    atarSelected,
  } = useAuth()
  const { selectedMode } = useCart()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'days').format('YYYY-MM-DD')
  let to = moment().add(1, 'days').format('YYYY-MM-DD')
  const { setAgentOptions } = useModals()
  let profileObj = [
    /*
        {
            Title: 'ראשי',
            TitleEng: 'Shopping List',
            Link: '/',
            Img: 'home',
            OnlyAgent: false,
            OnlyAgentSuper: false,
            OnlyDesktop:true
        },*/

    {
      Title: 'מסמכי לקוח',
      TitleEng: 'My Orders',
      Link: `/documentPage?page=1&from=${from}&to=${to}`,
      Img: 'storefront',
      OnlyAgent: true,
      OnlyAgentSuper: true,
      OnlyDesktop: false,
      notForMisrad: false,
    },
    {
      Title: 'מוצרים קבועים',
      TitleEng: 'My Products',
      Link: '/client/regular/0/0/0/?page=1',
      Img: 'shopping_bag',
      OnlyAgent: false,
      OnlyAgentSuper: false,
      OnlyDesktop: false,
      notForMisrad: false,
    },
    {
      Title: 'מומלצים עבורך',
      TitleEng: 'Recommended Products',
      Link: '/client/recommended/0/0/0/?page=1',
      Img: 'star',
      OnlyAgent: false,
      OnlyAgentSuper: false,
      OnlyDesktop: false,
      notForMisrad: false,
    },
    /*{
            Title: 'רשימות קניות',
            TitleEng: 'Shopping List',
            Link: '/shoppinglist/',
            Img: 'checklist',
            OnlyAgent: false
        },*/

    // {
    //     Title: 'מסמכים לאישור',
    //     TitleEng: 'Approve Docs',
    //     Link: '/approveDoc/1/',
    //     Img: 'checklist_rtl',
    //     OnlyAgent: true,
    //     OnlyAgentSuper: true,
    //     OnlyDesktop:false,
    //     notForMisrad:true
    // },
    // {
    //     Title: 'מסמכים',
    //     TitleEng: 'Shopping List',
    //     Link: '/docsAgent/1/',
    //     Img: 'article',
    //     OnlyAgent: true,
    //     OnlyAgentSuper: false,
    //     OnlyDesktop:false,
    //     notForMisrad:false
    // },
    /*{
            Title: 'טיוטות',
            TitleEng: 'Shopping List',
            Link: '/agentDrafts/1/',
            Img: 'draft_orders',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false
        },*/
    // {
    //     Title: 'טיוטות/הזמנות',
    //     TitleEng: 'Shopping List',
    //     Link: '/DocsHistoryAgent/1/',
    //     Img: 'article',
    //     OnlyAgent: true,
    //     OnlyAgentSuper: false,
    //     OnlyDesktop:false,
    //     notForMisrad:false
    // },
    /*{
            Title: 'גביה',
            TitleEng: 'Shopping List',
            Link: '/agentGviya/',
            Img: 'account_balance_wallet',
            OnlyAgent: true,
            OnlyAgentSuper: false,
            OnlyDesktop:false
        },*/
    // {
    //     Title: 'אחרונים במלאי',
    //     TitleEng: 'Shopping List',
    //     Link: '/category/lastOnHand/0/0/0/1/0/',
    //     Img: 'inventory_2',
    //     OnlyAgent: true,
    //     OnlyAgentSuper: false,
    //     OnlyDesktop:false,
    //     notForMisrad:false
    // },

    // {
    //     Title: 'ביצועי סוכנים',
    //     TitleEng: 'Shopping List',
    //     Link: '/agent-statistics/1/',
    //     Img: 'support_agent',
    //     OnlyAgent: true,
    //     OnlyAgentSuper: true,
    //     OnlyDesktop:false,
    //     notForMisrad:true
    // }
  ]

  const beforeLogOut = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בסל ימחקו')
    if (ask) {
      logOut()
    }
  }

  const logOutClient = () => {
    setSelectClient(null)
    navigate('/agentClients')
  }
  return (
    <div id="MyProfileMenu-cont" className="MyProfileMenu-cont">
      <div className="MyProfileMenu-subcont">
        <div className="userDet-main-cont">
          <div className="userDet-sub-cont">
            {isAdmin && (
              <>
                <p>{'אדמין'}</p>
                <p className="line"></p>
              </>
            )}
            {isClient && (
              <div className="userDet-client-cont">
                <p className="profile-cube-title">לקוח</p>
                <p>{user?.name}</p>
                <p>{user?.extId}</p>
              </div>
            )}
            <>
              <>
                {selectedMode == 'order' && (
                  <p className="actions-title">{'הזמנה'}</p>
                )}
                {selectedMode == 'quote' && (
                  <p className="actions-title">{'ה.מחיר'}</p>
                )}
                {selectedMode == 'return' && (
                  <p className="actions-title">{'החזרה'}</p>
                )}
                <div style={{ textAlign: 'right' }}>
                  <AtarSelection />
                </div>
              </>
            </>
          </div>

          <div className="userDet-sub-cont">
            {isAgent && (
              <div className="btn-cont col">
                <div
                  className="logOutCont agent-actions"
                  onClick={() => setAgentOptions(true)}
                >
                  <p>{'פעולות'}</p>
                </div>
              </div>
            )}
            {!client ? (
              <div className="btn-cont col">
                <div className="logOutCont" onClick={() => beforeLogOut()}>
                  <p>{'התנתק'}</p>
                </div>
              </div>
            ) : (
              <div className="btn-cont col">
                <div className="logOutCont" onClick={() => logOutClient()}>
                  <p>{'התנתק מלקוח'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <>
            {(isClient || client) && (
              <Link to={'/profile'} onClick={() => setOpenProfile(false)}>
                <div className="MyProfile-row" onClick={() => close()}>
                  <span className="material-symbols-outlined search-img">
                    {'person'}
                  </span>
                  <p>{'אזור אישי'}</p>
                </div>
              </Link>
            )}

            {user &&
              profileObj?.map((item, key) => {
                return (
                  <Link key={key} to={item.Link}>
                    <div
                      key={key}
                      className="MyProfile-row"
                      onClick={() => close()}
                    >
                      <span className="material-symbols-outlined search-img">
                        {item.Img}
                      </span>
                      <p>{item.Title}</p>
                    </div>
                  </Link>
                )
              })}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ProfileMenu
