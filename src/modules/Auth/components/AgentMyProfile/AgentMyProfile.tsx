import React from 'react'
import { useAuth } from '../../store/useAuthStore'

const AgentMyProfile = () => {
  const { user } = useAuth()
  return (
    <div className="Profilepage-subcont2 flex-container">
      {/* <div className={"Profile-page-sub col-lg-12"}>
          <h1>{lang=='he' ? breadObject.Title : breadObject.TitleEng}</h1>
          <div className={"Profile-page-sub2"}>
            <div className="col-lg-12 box-cont box-cont-agent-mode">
              <div className="col">
                <p className="title">{lang=='he' ? 'שם': 'Name'}</p>
                <p className="value">{this.state.data.userFromDb.Name}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'איש קשר': 'Contact'}</p>
                <p className="value">{this.state.data.userFromDb.ContactName}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'מייל': 'Email'}</p>
                <p className="value">{this.state.data.userFromDb.Mail}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'ח.פ/ע.מ': 'Email'}</p>
                <p className="value">{this.state.data.userFromDb.Hp}</p>
              </div>
              <div className="col">
              <p className="title">{lang=='he' ? 'טלפון': 'Phone'}</p>
                <p className="value">{this.state.data.userFromDb.Tel}</p>
              </div>
              <div className="col">
                 <p className="title">{lang=='he' ? 'עיר': 'City'}</p>
                 <p className="value">{this.state.data.userFromDb.Town}</p>
               </div>
               <div className="col col-longText">
                 <p className="title">{lang=='he' ? 'הערות': 'City'}</p>
                 <p className="value">{this.state.data.userFromDb.AddressJson}</p>
              </div>
            </div>
          </div>
        </div>
        */}
      <div className={'Profile-page-sub col-lg-12'}>
        <h1>{'כספים'}</h1>
        <div className={'Profile-page-sub2'}>
          <div className="col-lg-12 box-cont box-cont-agent-mode">
            <>
              {user?.hp && (
                <div className="col">
                  <p className="title">{'מס חברה'}</p>
                  <p className="value">{user?.hp}</p>
                </div>
              )}
              {user?.payCode && (
                <div className="col alert">
                  <p className="title">{'קוד תנאי תשלום'}</p>
                  <p className="value">{user?.payCode}</p>
                </div>
              )}
              {user?.payDesc && (
                <div className="col">
                  <p className="title">{'תנאי תשלום'}</p>
                  <p className="value">{user?.payDesc}</p>
                </div>
              )}
              {user?.maxCredit ? (
                <div className="col">
                  <p className="title">{'תיקרת אשראי'}</p>
                  <p className="value">{user?.maxCredit}</p>
                </div>
              ) : null}
              {user?.maxObligo ? (
                <div className="col">
                  <p className="title">{'תיקרת אובליגו'}</p>
                  <p className="value">{user?.maxObligo}</p>
                </div>
              ) : null}
              {user?.taxCode && (
                <div className="col">
                  <p className="title">{'קוד ניכוי מס'}</p>
                  <p className="value">{user?.taxCode}</p>
                </div>
              )}
              {/* 
                 <div className="col">
                   <p className="title">{'חובות פתוחים'}</p>
                   <span className="material-symbols-outlined"
                        //  onClick={()=>this.getOpenDeptInvoices()}
                         >account_balance_wallet
                         </span>
                 </div>
                 <div className="col">
                   <p className="title">{'שיקים לפרעון'}</p>
                   <span className="material-symbols-outlined"
                      //  onClick={()=>this.getFutureCheqs()}
                       >payments</span>
                 </div> */}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentMyProfile
