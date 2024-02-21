import axios from 'axios'

export const AdminCatalogService = {
  async updateCategory(category: any): Promise<ICategory> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/categories/${category.id}`,
      category,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },

  async dragAndDropCategories(category: ICategory[]): Promise<ICategory> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/dragAndDrop/categories`,
      category,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },
}
