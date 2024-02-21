import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
let to = moment().format('YYYY-MM-DD')
const sidebarAdmin = [
  /*{
      Title: 'שיוך קטגוריות',
      Link: '/category-build/1',
      Img: 'list.svg',
      Password: false
    },*/
  // {
  //   Title: 'ניהול מוצרים',
  //   Link: '/admin/category-edit/0/0/0',
  //   Img: 'hallway',
  //   Password: false,
  // },
  {
    Title: 'לקוחות',
    Link: '/admin/clients?page=1',
    Img: 'group',
    Password: false,
    Pop: false,
  } /*,
      {
          Title: 'אזורי חלוקה',
          Link: '/gis',
          Img: 'gps.svg',
          Password: false,
      Pop: false
      }*/,
  {
    Title: 'הודעות פרסומיות',
    Link: '/admin/notification',
    Img: 'sms',
    Password: false,
    Pop: false,
  },

  /*  {box-shadow: 0px 8px 25px #b6b4b48c;
      border-radius: 8px;
  }
          Title: 'מחלקות',
          Link: '/deptEdit',
          Img: 'department.svg',
          Password: false
      },
    {
          Title: 'ניהול עובדים',
          Link: '/employee',
          Img: 'employees.svg',
          Password: false
      },
    {
      Title: 'ליקוט',
      Link: '/collector-step-three',
      Img: 'box.svg',
      Password: false
    },*/
  {
    Title: 'הזמנות',
    Link: `/admin/approveDoc?page=1&from=${from}&to=${to}`,
    Img: 'shopping_cart',
    Password: false,
    Pop: false,
    isLang: true,
  },
  //   {
  // 	 	Title: 'ניהול מבצעים',
  // 	 	Link: '/admin-sales',
  // 	 	Img: 'sales.svg',
  // 	 	Password: false,
  //     Pop: false
  // 	},
  /*{
      Title: 'ניהול מותגים',
      Link: '/brands-edit',
      Img: 'nav_prod.svg',
      Password: false
    },*/

  // {
  //   Title: 'סוכנים',
  //   Link: '/admin/agents',
  //   Img: 'support_agent',
  //   Password: false,
  // },
  //   {
  //           Title: 'דאשבורד',
  //           Link: '/admin/statistics/1',
  //           Img: 'trending_up',
  //           Password: false
  //   },
  //   {
  //           Title: 'סטטיסטיקות',
  //           Link: '/admin/comprasion',
  //           Img: 'leaderboard',
  //           Password: false
  //   }
  /*,
          {
                  Title: 'סטטיסטיקות סוכנים',
                  Link: '/agent-statistics/1',
                  Img: 'agent.svg',
                  Password: false
          }
  
  
    {
           Title: 'מידע',
           Link: '/admin-info',
           Img: 'info.svg',
           Password: false,
      Pop: false
      },
      {
          Title: 'עדכון מערכת',
          Link: '/admin-history',
          Img: 'sync.svg',
          Password: false,
      Pop: true
      }*/
]

type AdminRightSideBarProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const AdminRightSideBar: FC<AdminRightSideBarProps> = ({
  active,
  setActive,
}) => {
  return (
    <nav id="main" data-class={'he'} className={active ? 'active' : ''}>
      <div className="nav-cont" onClick={() => setActive(false)}></div>
      <ul>
        {sidebarAdmin?.map((element, index) => {
          return (
            <li key={index}>
              <Link to={element.Link}>
                <span
                  className="material-symbols-outlined googleIconHover"
                  style={{ fontSize: '40px' }}
                >
                  {element.Img}
                </span>
                <span>{element.Title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AdminRightSideBar
