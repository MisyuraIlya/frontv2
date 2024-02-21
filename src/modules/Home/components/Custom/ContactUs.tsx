import React from 'react'

const ContactUs = () => {
  return (
    <div className="contact-dept">
      <div className="h1-cont">
        <h1>{'יצירת קשר'}</h1>
      </div>
      <div className="main-cont">
        <div className="main-sub-cont flex-container">
          <div className="square-cont col-lg-12">
            <h2 className="main-h2">{'לוגיסטיקה והפצה'}</h2>
            <div className="square-subcont big flex-container">
              <div className="text-cont col-lg-4">
                <div className="text-cont-sub">
                  <h3>{'אנה גולדין'}</h3>
                  <p>073-2773748</p>
                  <p>050-7218026</p>
                  <p>anna@medi-market.co.il</p>
                </div>
              </div>
              <div className="img-cont col-lg-8">
                <img
                  src={'https://almedimarket.com/src/img/logistics.jpg'}
                  alt=""
                />
              </div>
            </div>
            <h2 className="main-h2">{'שירות לקוחות'}</h2>

            <div className="square-subcont small flex-container">
              <div className="text-cont small col-lg-3">
                <div className="text-cont-sub">
                  <h2>{'בתי אבות ומוסדות רפואיים'}</h2>
                  <h3>{'מורן קלי'}</h3>
                  <p>073-2773727</p>
                  <p>moran@medi-market.co.il</p>
                </div>
              </div>
              <div className="text-cont small col-lg-3">
                <div className="text-cont-sub">
                  <h2>{'יבוא תרופות מיוחדות'}</h2>
                  <h3>{'אורטל זנזורי'}</h3>

                  <p>073-2773703</p>
                  <p>ortal@medi-market.co.il</p>
                </div>
              </div>
              <div className="text-cont small col-lg-3">
                <div className="text-cont-sub">
                  <h2>{'בתי חולים'}</h2>
                  <h3>{'נטלי מסיקה'}</h3>
                  <p>073-2773733</p>
                  <p>humane-info@medi-market.co.il</p>
                </div>
              </div>
              <div className="text-cont small col-lg-3">
                <div className="text-cont-sub">
                  <h2>{'ווטרינריה'}</h2>
                  <h3>{'ירין ברנר'}</h3>
                  <p>073-2773700</p>
                  <p>yarin@medi-market.co.il </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
