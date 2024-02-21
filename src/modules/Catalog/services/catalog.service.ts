import axios from 'axios'
import { getClientExtId } from '../../Auth/helpers/auth.helper'

interface GetCatalogResponse extends Hydra {
  'hydra:member': IProduct[] // Define a more specific type if possible
}

interface GetCategoriesResponse extends Hydra {
  'hydra:member': ICategory[]
}

interface GetCategoriesAttribute extends Hydra {
  'hydra:member': IAttributeMain[]
}

interface GetPurchaseHistoryItem extends Hydra {
  'hydra:member': PurchaseHistoryItem[]
}

interface GetProductPopUpData {
  status: string
  data: ProductPopUp
  message: string
}

export const CatalogServices = {
  async GetCatalog(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchParams: string,
    documentType: CatalogDocumentType
  ): Promise<GetCatalogResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/catalog/${documentType}/${lvl1}/${lvl2}/${lvl3}${searchParams}&userExtId=${getClientExtId()}`
    )
    return response.data
  },

  async GetCategories(userExId: string): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesApp`
    )
    return response.data
  },

  async GetCategoriesAll(): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesApp`
    )
    return response.data
  },

  async GetCategoriesFilter(
    userExId: string,
    searchValue: string
  ): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesApp?userExtId=${userExId}&search=${searchValue}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    return response.data
  },

  async GetDynamicCategories(
    lvl1: string,
    lvl2: string,
    lvl3: string
  ): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesAppDynamic/${lvl1}/${lvl2}/${lvl3}`
    )
    return response.data
  },

  async GetAttributes(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchValue: string,
    userExId: string
  ): Promise<GetCategoriesAttribute> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/attribute/${lvl1}/${lvl2}/${lvl3}?userExtId=${userExId}&search=${searchValue}`
    )
    return response.data
  },

  async GetPurchaseHistory(
    userExId: string,
    sku: string
  ): Promise<GetPurchaseHistoryItem> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/purchaseHistory/${userExId}/${sku}`
    )
    return response.data
  },

  async GetProductPopUpData(sku: string): Promise<GetProductPopUpData> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/productPopUp?sku=${sku}`
    )
    return response.data
  },
}
