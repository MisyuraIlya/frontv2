import moment from 'moment'

const dateFrom = moment().subtract(1, 'day').format('YYYY-MM-DD')
const dateTo = moment().format('YYYY-MM-DD')
export const URLS = {
  HOME: {
    LINK: '/',
    LABEL: 'עגלה',
  },
  CATALOG: {
    LINK: '/',
    LABEL: 'קטלוג',
  },
  CART: {
    LINK: '/cart',
    LABEL: 'עגלה',
  },
  HISTORY: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'הסטוריית רכישה',
  },
  DOCUMENTS: {
    LINK: `/documentPage/order/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'מסמכים',
  },
  PROFILE: {
    LINK: '/profile',
    LABEL: 'פרופיל',
  },
  ADMIN_EDIT_CATALOG: {
    LINK: '/admin/category-edit/0/0',
    LABEL: 'ניהול קטלוג',
  },
  ADMIN_CLIENTS: {
    LINK: '/admin/ROLE_USER?page=1',
    LABEL: 'לקוחות',
  },
  ADMIN_AGENTS: {
    LINK: '/admin/ROLE_AGENT?page=1',
    LABEL: 'סוכנים',
  },
  ADMIN_NOTIFICATIONS: {
    LINK: `/admin/notification`,
    LABEL: 'הודעות',
  },
  AGNET_DASHBOARD: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'מסמכים',
  },
  AGNET_DOCUMENT_AGENT: {
    LINK: '/agentDocument',
    LABEL: 'מסמכים',
  },
  AGNET_ORDER_AGENT: {
    LINK: '/agentQuote',
    LABEL: 'טיוטות/הזמנות',
  },
  AGNET_GVIYA: {
    LINK: '/gviya',
    LABEL: 'גביה',
  },
  AGNET_AGENT_STATISTICS: {
    LINK: '/agentStatistics',
    LABEL: 'סטטיסטיקה',
  },
  AGENT_DOCUMENT_OFFLINE: {
    LINK: '/offline',
    LABEL: 'מסמכי אופליין',
  },
}
