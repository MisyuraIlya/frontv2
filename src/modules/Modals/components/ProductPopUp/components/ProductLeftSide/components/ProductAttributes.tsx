import React from 'react'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'

const ProductAttributes = () => {
  const { selectedProd } = useSelectedProduct()
  //   TODO
  return (
    <>
      {/* {this.state.attrObj && this.state.attrObj.length > 0
            ? this.state.attrObj.map((attrEle, attrInd) => {
                    return (
                        <div key={attrInd} className="prod-info-cont flex-container">
                            <div className="col-lg-3">
                                {attrEle.MainAttr.ExtId == 48 ? (
                                    <a href={attrEle.SubAttr.Val} target="_blank">
                                        <img src={process.env.REACT_APP_MEDIA + '/icon/youtube.jpg'} />
                                    </a>
                                ) : (
                                    <p className="c-title">
                                        {lang === "he" ? attrEle.MainAttr.Value : ''}
                                    </p>
                                )}
                            </div>
                            <div className="col-lg-9">
                                {!attrEle.MainAttr.Extra3 ? (
                                    <p className="c-nomber rtl">{attrEle.SubAttr.Val}</p>
                                ) : null}
                                <a href={attrEle.SubAttr.Val} target="_blank">
                                <span className="ExtendBtn material-symbols-outlined">visibility</span>
                            </a>
                            </div>
                        </div>
                    );
                })
        : null} */}
    </>
  )
}

export default ProductAttributes
