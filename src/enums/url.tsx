import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CampaignIcon from '@mui/icons-material/Campaign'
import StorefrontIcon from '@mui/icons-material/Storefront'

export const clientURL = {
  PROFILE: {
    LINK: '/profile',
    LABEL: 'פרופיל',
    ICON: <PersonIcon sx={{ height: '30px', width: '30px' }} />,
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: true,
    SHOW_IN_HEADER: true,
    WITH_BADGE: false,
  },
  CART: {
    LINK: '/cart',
    LABEL: 'עגלה',
    ICON: <ShoppingCartIcon sx={{ height: '30px', width: '30px' }} />,
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: true,
  },
  USER_LIST: {
    LINK: '/agnetClients',
    LABEL: 'הלקוחות שלי',
    ICON: <StorefrontIcon sx={{ height: '30px', width: '30px' }} />,
    FOR_AGENT: true,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: false,
  },
  NOTIFICATIONS: {
    LINK: '',
    LABEL: 'הודעות',
    ICON: <CampaignIcon sx={{ height: '30px', width: '30px' }} />,
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: true,
  },
  DOCUMENTS: {
    LINK: '/documentPage',
    LABEL: 'מסמכי לקוח',
    ICON: <ArticleOutlinedIcon sx={{ height: '30px', width: '30px' }} />,
    FOR_AGENT: true,
    SHOW_IN_PROFILE_MENU: true,
    SHOW_IN_HEADER: false,
    WITH_BADGE: false,
  },
}

export const agentURL = {
  DOCUMENT_APPROCE: {
    LINK: '/documentApprove',
    LABEL: 'מסמכים לאישור',
    ICON: <ChecklistRtlIcon />,
  },
  DOCUMENT_AGENT: {
    LINK: '/agentDocument',
    LABEL: '/מסמכים',
    ICON: <ArticleOutlinedIcon />,
  },
  ORDER_AGENT: {
    LINK: '/agentQuote',
    LABEL: 'טיוטות/הזמנות',
    ICON: <StickyNote2OutlinedIcon />,
  },
  AGENT_GVIYA: {
    LINK: '/gviya',
    LABEL: 'גביה',
    ICON: <CurrencyExchangeOutlinedIcon />,
  },
  AGENT_STATISTICS: {
    LINK: '/agentStatistics',
    LABEL: 'גביה',
    ICON: <SupportAgentOutlinedIcon />,
  },
  DOCUMENT_OFFLINE: {
    LINK: '/offline',
    LABEL: '/מסמכי אופליין',
    ICON: <WifiOffOutlinedIcon />,
  },
}
