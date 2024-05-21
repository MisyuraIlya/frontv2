// Global
import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'
import OrderSettings from '../modules/Modals/components/OrderSettings/OrderSettings'
import ProductPopUp from '../modules/Modals/components/ProductPopUp/ProductPopUp'
import TablePopUp from '../modules/Modals/components/TablePopUp/TablePopUp'
import PayPopUp from '../modules/Modals/components/PayPopUp/PayPopUp'
import ClientRightSideBar from '../modules/Modals/adminComponents/ClientRightSideBar/ClientRightSideBar'
import Gallery from '../modules/Modals/adminComponents/Galerry/Gallery'
import { useSelectedProduct } from '../modules/Modals/store/selecterdProduct.store'
import AgentOptions from '../modules/Modals/agentComponents/AgentOptions'
import { useClientStore } from '../modules/Admin/store/ClientsStore'
import RestoreCartModal from '../modules/Modals/agentComponents/RestoreCartModal'
import PdfViwer from '../modules/Modals/components/PdfViwer/PdfViwer'
import ImageModal from '../modules/Modals/components/ImageModal/ImageModal'
import Modals from '../components/modals'
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
  const [pdfLinkOrBase64, setPdfLinkOrBase64] = useState('')
  const [pdfViwer, setPdfViwer] = useState(false)
  const [srcImageModal, setImageSrcModal] = useState('')
  const [imageModal, setImageModal] = useState(false)
  //ADMINS
  const { setSelectedAgent } = useClientStore()
  const [gallery, setGallery] = useState(false)

  //AGENTS
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
    setAgentOptions,
    setRestoreCartModal,
    setPdfViwer,
    handlePdfViwer,
    pdfLinkOrBase64,
    handleImageModal,
    srcImageModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {/* <OrderSettings
        active={openCartSettings}
        setActive={setOpenCartSettings}
      />
      <ProductPopUp
        active={selectedProduct}
        setActive={onCloseSelectedProduct}
      /> */}
      {openAuthModal && (
        <Modals.Auth active={openAuthModal} setActive={setOpenAuthModal} />
      )}
      {/* <MobileSideBar active={openMobileSideBar} setActive={setOpenMobileSideBar}/>
      <TablePopUp active={activeTablePopUp} setActive={setActiveTablePopUp} />
      {openPopUpPay && (
        <PayPopUp active={openPopUpPay} setActive={setOpenPopUpPay} />
      )} */}
      {/* 
      <ClientRightSideBar
        active={clientRightSideBar}
        setActive={setClientRightSideBar}
      />

      <Gallery active={gallery} setActive={setGallery} />
      <AgentOptions active={agentOptions} setActive={setAgentOptions} />
      <PdfViwer active={pdfViwer} setActive={setPdfViwer} />
      <ImageModal active={imageModal} setActive={setImageModal} />
      <RestoreCartModal
        active={restoreCartModal}
        setActive={setRestoreCartModal}
      /> */}
      {children}
    </ModalContext.Provider>
  )
}

export { useModals, ModalsProvider }
