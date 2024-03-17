// Global
import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'
import AuthPopUp from '../components/AuthPopUp/AuthPopUp'
import OrderSettings from '../components/OrderSettings/OrderSettings'
import ProductPopUp from '../components/ProductPopUp/ProductPopUp'
import TablePopUp from '../components/TablePopUp/TablePopUp'
import PayPopUp from '../components/PayPopUp/PayPopUp'
import ClientRightSideBar from '../adminComponents/ClientRightSideBar/ClientRightSideBar'
import LeftSideBar from '../components/LeftSideBar/LeftSideBar'
import Gallery from '../adminComponents/Galerry/Gallery'
import { useSelectedProduct } from '../store/selecterdProduct.store'
import EditTarget from '../agentComponents/EditTarget'
import { useAgentProfileStore } from '../../Agent/store/agentProfile.store'
import ObjectiveList from '../agentComponents/ObjectiveList'
import { useMyScheduleCalendar } from '../../Agent/store/ScheduleCalendar.store'
import ObjectiveCreateModal from '../agentComponents/ObjectiveCreateModal'
import AgentOptions from '../agentComponents/AgentOptions'
import AgentsModal from '../adminComponents/AgentsModal/AgentsModal'
import { useClientStore } from '../../Admin/store/ClientsStore'
import RestoreCartModal from '../agentComponents/RestoreCartModal'
import PdfViwer from '../components/PdfViwer/PdfViwer'
import ImageModal from '../components/ImageModal/ImageModal'
// Defines
interface ModalContextType {
  openAuthModal: boolean
  setOpenAuthModal: (bool: boolean) => void
  openCartSettings: boolean
  setOpenCartSettings: (bool: boolean) => void
  selectedProduct: boolean
  setSelectedProduct: (bool: boolean) => void
  selectProduct: (product: IProduct) => void
  setActiveTablePopUp: (bool: boolean) => void
  openPopUpPay: boolean
  setOpenPopUpPay: (bool: boolean) => void
  openMobileSideBar: boolean
  setOpenMobileSideBar: (bool: boolean) => void
  openSideBar: boolean
  setOpenSideBar: (bool: boolean) => void
  gallery: boolean
  setGallery: (bool: boolean) => void
  clientRightSideBar: boolean
  setClientRightSideBar: (bool: boolean) => void
  leftSideBar: boolean
  setLeftSideBar: (bool: boolean) => void
  taskModal: boolean
  setTaskModal: (bool: boolean) => void
  targetModal: boolean
  setTargetModal: (bool: boolean) => void
  setTargetModalItem: (item: IAgentTaget) => void
  setAgentsModalItem: (item: IUser) => void
  setAgentsModal: (bool: boolean) => void
  setObjectItemModal: (item: IAgentObjective) => void
  setObjectCreate: (bool: boolean) => void
  setAgentOptions: (bool: boolean) => void
  setRestoreCartModal: (bool: boolean) => void
  setPdfViwer: (bool: boolean) => void
  handlePdfViwer: (value: string) => void
  pdfLinkOrBase64: string
  handleImageModal: (value: string) => void
  srcImageModal: string
}
const ModalContext = createContext<ModalContextType | null>(null)

// React hook
const useModals = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "ModalContext Provider"')
  }
  return context
}

interface ModalsProviderProps {
  children: ReactNode
}
const ModalsProvider: FC<ModalsProviderProps> = ({ children }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const { setSelectedProd } = useSelectedProduct()
  const [openCartSettings, setOpenCartSettings] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(false)
  const [activeTablePopUp, setActiveTablePopUp] = useState(false)
  const [openPopUpPay, setOpenPopUpPay] = useState(false)
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [clientRightSideBar, setClientRightSideBar] = useState(false)
  const [leftSideBar, setLeftSideBar] = useState(false)
  const [pdfLinkOrBase64, setPdfLinkOrBase64] = useState('')
  const [pdfViwer, setPdfViwer] = useState(false)
  const [srcImageModal, setImageSrcModal] = useState('')
  const [imageModal, setImageModal] = useState(false)
  //ADMINS
  const { setSelectedAgent } = useClientStore()
  const [gallery, setGallery] = useState(false)
  const [agentsModal, setAgentsModal] = useState(false)

  //AGENTS
  const { setSelectedTarget, setSelectedVisit } = useAgentProfileStore()
  const { setSelectedObjectItem } = useMyScheduleCalendar()
  const [taskModal, setTaskModal] = useState(false)
  const [targetModal, setTargetModal] = useState(false)
  const [objectModal, setObjectModal] = useState(false)
  const [objectCreate, setObjectCreate] = useState(false)
  const [agentOptions, setAgentOptions] = useState(false)
  const [restoreCartModal, setRestoreCartModal] = useState(false)

  const selectProduct = (product: IProduct) => {
    setSelectedProd(product)
    setSelectedProduct(true)
  }

  const onCloseSelectedProduct = (bool: boolean) => {
    setSelectedProduct(bool)
    if (!bool) {
      // clearSubProducts()
    }
  }

  const setTargetModalItem = (item: IAgentTaget) => {
    setTargetModal(true)
    setSelectedTarget(item)
  }

  const closeTargetModalItem = (bool: boolean) => {
    setTargetModal(bool)
    if (!bool) {
      setSelectedTarget(null)
    }
  }

  const setObjectItemModal = (item: IAgentObjective) => {
    setObjectModal(true)
    setSelectedObjectItem(item)
  }

  const closeObjectItemModal = (bool: boolean) => {
    setObjectModal(bool)
    if (!bool) {
      setSelectedObjectItem(null)
    }
  }

  const setAgentsModalItem = (item: IUser) => {
    setAgentsModal(true)
    setSelectedAgent(item)
  }

  const closeAgentsModalItem = (bool: boolean) => {
    setAgentsModal(bool)
    if (!bool) {
      setSelectedAgent(null)
    }
  }

  const handlePdfViwer = (value: string) => {
    setPdfLinkOrBase64(value)
    setPdfViwer(true)
  }

  const handleImageModal = (src: string) => {
    setImageModal(true)
    setImageSrcModal(src)
  }

  const value = {
    openCartSettings,
    setOpenCartSettings,
    selectedProduct,
    setSelectedProduct,
    selectProduct,
    setActiveTablePopUp,
    openPopUpPay,
    setOpenPopUpPay,
    openMobileSideBar,
    setOpenMobileSideBar,
    openSideBar,
    setOpenSideBar,
    openAuthModal,
    setOpenAuthModal,
    gallery,
    setGallery,
    clientRightSideBar,
    setClientRightSideBar,
    leftSideBar,
    setLeftSideBar,
    taskModal,
    setTaskModal,
    targetModal,
    setTargetModal,
    setTargetModalItem,

    setObjectItemModal,
    setObjectCreate,
    setAgentOptions,
    setAgentsModal,
    setAgentsModalItem,
    setRestoreCartModal,
    setPdfViwer,
    handlePdfViwer,
    pdfLinkOrBase64,
    handleImageModal,
    srcImageModal,
  }

  return (
    <ModalContext.Provider value={value}>
      <OrderSettings
        active={openCartSettings}
        setActive={setOpenCartSettings}
      />
      <ProductPopUp
        active={selectedProduct}
        setActive={onCloseSelectedProduct}
      />
      {openAuthModal && (
        <AuthPopUp active={openAuthModal} setActive={setOpenAuthModal} />
      )}
      {/* <MobileSideBar active={openMobileSideBar} setActive={setOpenMobileSideBar}/> */}
      <TablePopUp active={activeTablePopUp} setActive={setActiveTablePopUp} />
      {openPopUpPay && (
        <PayPopUp active={openPopUpPay} setActive={setOpenPopUpPay} />
      )}

      <ClientRightSideBar
        active={clientRightSideBar}
        setActive={setClientRightSideBar}
      />

      <LeftSideBar active={leftSideBar} setActive={setLeftSideBar} />
      {/* ADMINS */}
      <Gallery active={gallery} setActive={setGallery} />
      <AgentsModal active={agentsModal} setActive={closeAgentsModalItem} />

      {/* implement AGENT MODALS */}
      <EditTarget active={targetModal} setActive={closeTargetModalItem} />
      <ObjectiveList active={objectModal} setActive={closeObjectItemModal} />
      <ObjectiveCreateModal active={objectCreate} setActive={setObjectCreate} />
      <AgentOptions active={agentOptions} setActive={setAgentOptions} />
      <PdfViwer active={pdfViwer} setActive={setPdfViwer} />
      <ImageModal active={imageModal} setActive={setImageModal} />
      <RestoreCartModal
        active={restoreCartModal}
        setActive={setRestoreCartModal}
      />
      {children}
    </ModalContext.Provider>
  )
}

export { useModals, ModalsProvider }
