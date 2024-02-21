import React from 'react'

const Banner = () => {
  return (
    <div className="stats-cont-main">
      <div className="promotion">
        <div className="container wrapper">
          <div className="h1-cont">
            <h1 style={{ fontSize: '40px', fontWeight: 300 }}>
              {'משרתים מעל 1,000 לקוחות בכל הסקטורים'}
            </h1>
          </div>
        </div>
      </div>
      <div className="stats-cont">
        <div className="masc">
          <div className="container">
            <div className="flex-container">
              <div className="col-lg-3 col-lg">
                <div className="wrapper round-cont">
                  <div className="wrapper round-subcont">
                    <div className="img">
                      <img
                        src={
                          'https://almedimarket.com/src/img/veterinary_blue.png'
                        }
                        width={60}
                        alt=""
                      />
                    </div>
                    <h3 style={{ fontSize: '36px', fontWeight: 400 }}>640</h3>
                    <p>{'וטרינרים'}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-lg">
                <div className="wrapper round-cont">
                  <div className="wrapper round-subcont">
                    <div className="img">
                      <img
                        src={'https://almedimarket.com/src/img/nurse_blue.png'}
                        width={60}
                        alt=""
                      />
                    </div>
                    <h3 style={{ fontSize: '36px', fontWeight: 400 }}>310</h3>
                    <p>{'מרכזים רפואיים'}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-lg">
                <div className="wrapper round-cont">
                  <div className="wrapper round-subcont">
                    <div className="img">
                      <img
                        src={
                          'https://almedimarket.com/src/img/madical_blue.png'
                        }
                        width={60}
                        alt=""
                      />
                    </div>
                    <h3 style={{ fontSize: '36px', fontWeight: 400 }}>540</h3>
                    <p>{'בתי אבות'}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-lg">
                <div className="wrapper round-cont">
                  <div className="wrapper round-subcont">
                    <div className="img">
                      <img
                        src={
                          'https://almedimarket.com/src/img/hospital_blue.png'
                        }
                        width={60}
                        alt=""
                      />
                    </div>
                    <h3 style={{ fontSize: '36px', fontWeight: 400 }}>56</h3>
                    <p>{'בתי חולים'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
