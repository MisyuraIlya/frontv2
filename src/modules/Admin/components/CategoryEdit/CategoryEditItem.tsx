import React, { FC, useEffect, useState } from 'react'
// import MyCropper from '../../../../components/tools/MyCropper';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCategories } from '../../../Catalog/store/CategoriesStore'
import { AdminCatalogService } from '../../services/catalog.service'
import { useDebounce } from 'use-debounce'
import { base64ToFile } from '../../../../helpers/base64ToFile'
import { useProductsEditStore } from '../../store/ProductsEditStore'
import { MediaObjectService } from '../../services/mediaObject.service'
import MyCropper from '../../../../shared/MyCropper'
import { Grid, IconButton, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
interface CategoryEditItemProps {
  element: ICategory
}

const CategoryEditItem: FC<CategoryEditItemProps> = ({ element }) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false)
  const { getDynamicCategories, getCategories } = useCategories()
  const [title, setTitle] = useState(element.title)
  const [valueDebounced] = useDebounce(title, 1000)
  const { lvl1, lvl2, lvl3 } = useParams()
  const navigate = useNavigate()

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(convertFile, 'category')
    const res2 = await AdminCatalogService.updateCategory({
      id: element.id,
      MediaObject: res['@id'],
    })
    await MediaObjectService.ftpUploader(
      res2.MediaObject.filePath,
      'src/img3/category',
      'category'
    )
    await getDynamicCategories()
  }

  const unpublishHandle = async (
    categoryId: number | string,
    isPublished: boolean
  ) => {
    await AdminCatalogService.updateCategory({ id: categoryId, isPublished })
    await getDynamicCategories()
    await getCategories()
  }

  const handleLink = () => {
    if (lvl1 != '0' && lvl2 == '0') {
      return `/admin/category-edit/${lvl1}/${element.extId}/0`
    } else if (lvl1 != '0' && lvl2 != '0') {
      return `/admin/products-edit/${lvl1}/${lvl2}/${element?.extId}`
    } else {
      return `/admin/category-edit/${element.identify}/0/0`
    }
  }

  useEffect(() => {
    if (valueDebounced && activeEdit) {
      AdminCatalogService.updateCategory({
        id: element.id,
        title: valueDebounced,
      })
    }
  }, [valueDebounced])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <IconButton onClick={() => navigate(handleLink())}>
            <LoginIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <DragIndicatorIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <MyCropper
            aspectRatio={16 / 16}
            uploadImg={uploadImg}
            itemImage={
              element?.MediaObject?.filePath
                ? `product/${element?.MediaObject?.filePath}`
                : null
            }
          />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1">{element.id}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            item
            lg={3}
            onClick={() => setActiveEdit(true)}
            onBlur={() => setActiveEdit(false)}
          >
            <TextField
              type="text"
              placeholder="שם הקטגוריה"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      {lvl1 === '0' && lvl2 === '0' && lvl3 === '0' && (
        <div className="col-lg-1 status">
          {!element.isPublished ? (
            <div
              onClick={() => unpublishHandle(element.id, true)}
              className="input active"
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: 'white',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                close
              </span>
            </div>
          ) : (
            <div
              onClick={() => unpublishHandle(element.id, false)}
              className="input MyCentered"
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: 'white',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                done
              </span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CategoryEditItem
