import React from 'react'

const ContactFooter = () => {
  return (
    <div className="contact-footer" id="contact-footer">
      <div className="container">
        <div className="main-sub-cont">
          <div className="sub-cont flex-container">
            <div className="col-lg-5 cont-about-us">
              <div className="cont-about-us-cont">
                <div className="h2-cont">
                  <h2>{'אודותינו'}</h2>
                </div>
                <p>
                  מדי-מרקט הינה החברה המובילה בתחום יבוא והפצת מגוון רחב של
                  תרופות, ציוד רפואי ומכשור רפואי עבור מגוון רחב של מוסדות
                  רפואיים.
                </p>
                <p>
                  למדי- מרקט רישיון משרד הבריאות לניהול בית מרקחת ובית מסחר
                  לתרופות. החברה הינה בעלת תקן אירופאי GMP, GDP, בעלת אישור משרד
                  הבריאות ומפעילה מרכז הכנות לרקיחת הכנות מיוחדות (נוהל 132
                  ונוהל 135) וכמו כן מאושרת החברה לתקן ISO9001.
                </p>
                <p>
                  הובלה ברכבים מבוקרי טמפרטורות בהתאם להוראות ה- GDP המחמירות,
                  תוך פיקוח הדוק וקפדני של רוקחים אחראיים המבקרים את ההובלה
                  באמצעים טכנולוגיים משוכללים על מנת להבטיח את הספקת התרופות
                  במהירות ובאחריות תוך שמירה על תנאי הובלה נאותים.
                </p>
              </div>
            </div>
            <div className="col-lg-4 form-cont">
              <div className="form">
                <div className="wr">
                  <div className="input-group">
                    {/* <input
                                    type="text"
                                    value={""}
                                    placeholder={"שם"}
                                    onChange={(e) => this.setState({name: e.target.value})}
                                    id="Name"
                                /> */}
                  </div>
                  <div className="input-group">
                    {/* <input
                                    type="text"
                                    value={''}
                                    placeholder={"מייל"}
                                    onChange={(e) => this.setState({mail: e.target.value})}
                                    id="Mail"
                                />
                                </div>
                                <div className="input-group">
                                <input
                                    type="text"
                                    value={""}
                                    placeholder={"טלפון"}
                                    onChange={(e) => this.setState({phone: e.target.value})}
                                    id="Tel"
                                /> */}
                  </div>
                  <div className="input-group">
                    {/* <textarea
                                    placeholder={"הודעה"}
                                    type="text"
                                    value={""}
                                    onChange={(e) => this.setState({msg: e.target.value})}
                                    id="Msg"
                                /> */}
                  </div>
                  <div className="button-wrapper">
                    {/* <button onClick={()=> this.sendForm()}>{"שלח"}</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 info-cont">
              <div className="contact-info">
                <div className="flex-container row-cont">
                  <div className="col-lg-2">
                    <div className="img">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <ul>
                      <li className="title"> {'כתובת:'}</li>
                      <li> הקטיף 3, פארק תעשיות עמק חפר</li>
                    </ul>
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-2">
                    <div className="img">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <ul>
                      <li className="title">{'טלפון:'}</li>
                      <li>09-8844452</li>
                    </ul>
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-2">
                    <div className="img">
                      <span className="material-symbols-outlined">
                        alternate_email
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <ul>
                      <li className="title">{'אימייל:'}</li>
                      <li>humane-info@medi-market.co.il</li>
                    </ul>
                  </div>
                </div>

                <div className="flex-container row-cont">
                  <div className="col-lg-2">
                    <div className="img"></div>
                  </div>
                  <div className="col-lg-10 a-class">
                    {/* <a className="privacy a-class" href={process.env.REACT_APP_MEDIA + 'policy_form.pdf'} target="_blank">
                                            <span className="login">{'תנאי שימוש'}</span>
                                        </a> */}
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-2">
                    <div className="img"></div>
                  </div>
                  <div className="col-lg-10 a-class">
                    {/* <a className="privacy" href={process.env.REACT_APP_MEDIA + 'negishut.pdf'} target="_blank">
                                            <span className="login">{'הצהרת נגישות'}</span>
                                        </a> */}
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

export default ContactFooter
