import React from 'react'
import { Link } from 'react-router-dom'
const ComapnyActions = () => {
  const CatHeb1 = `
<p>
מדי-מרקט מספקת ליותר מ- 400
מרפאות וטרינריות, מוסדות מחקר,
ורשויות מקומיות מגוון רחב של תרופות,
ציוד מתכלה, מכשור וציוד רפואי…</p>
`

  const CatHeb2 = `
<p>
חברת איי. אל. מדי- מרקט, מתמחה
במתן פתרון מקיף למגוון צרכיהם
השוטפים של לקוחותיה בתחום התרופות,
הציוד הרפואי מוצרים מתכלים…
</p>
`

  const CatHeb3 = `
<p>
בשנים האחרונות, התפתח בישראל
ענף תיירות חדש וחדשני הוא ענף
"תיירות המרפא”. הרפואה המתקדמת
בישראל, לצד הכמות הגדולה יחסית…
</p>
`

  const DeptHeb1 = 'מדי מרקט הינה הספק המוביל לבתי אבות בישראל ...'
  const DeptHeb2 = 'יכולותיה של מדי-מרקט לספק למרכזים הרפואיים מגוון תרופות ...'
  const DeptHeb3 = 'מדי-מרקט מייצגת עשרות יצרני תרופות מרחבי העולם ...'
  const DeptHeb4 = 'מדי-מרקט מספקת מגוון רחב מאד של תרופות ...'
  const DeptHeb5 =
    'מדי-מרקט הינה אחת מתוך שני הספקים המובילים למרפאות ווטרינריות ...'
  const DeptHeb6 =
    "במדי-מרקט ‘מרכז הכנות' המוכר על ידי משרד הבריאות לפי נוהל 132 ונוהל 135 ..."

  const DeptEng1 =
    'Medi Market is the leading supplier for nursing homes in Israel ...'
  const DeptEng2 =
    "Medi-Market's capabilities to provide medical centers with a variety of drugs ..."
  const DeptEng3 =
    'Medi-Market represents dozens of pharmaceutical manufacturers from around the world ...'
  const DeptEng4 = 'Medi-Market provides a very wide range of medicines  ... '
  const DeptEng5 =
    'Medi-Market is one of the two leading suppliers of veterinary clinics ...'
  const DeptEng6 =
    'In the ‘Preparation Center’ market-recognized by the Ministry of Health according to Procedure 132 and Procedure 135 ...'

  const AboutHeb = `
<p>המפיץ הגדול ביותר של תרופות וציוד רפואי בישראל</p>
<p>מייצג מעל XX יצרני תרופות גלובליים בישראל וברשות הפלסטינית</p>
<p>רישום תרופות, שיווק, אכסון והפצה - הכל תחת קורת גג אחת</p>
<p>עשרות תרופות רשומות ועשרות נוספות בהליכי רישום</p>
<p>5,000 מ”ר שטח אכסון</p>
`

  const Activity1Heb = `
<p>
מדי-מרקט הינה החברה המובילה בישראל ברישום תרופות גנריות. מייצגת מעל ל 30 יצרני תרופות מרחבי העולם, ובעלת עשרות תרופות רשומות או נמצאות בתהליכי רישום.
</p>
`
  const Activity2Heb = `
<p>
מדי-מרקט הינה מהספקיות המובילות של תרופות המצויות במחסור בישראל או שאינן רשומות, אשר מסופקות ישירות לבתי חולים וקופות החולים.
</p>
`
  const Activity3Heb = `
<p>
כבעלת קשרים עסקיים עם עשרות יצרני תרופות ובתי מסחר ברחבי העולם, הפכה מדי-מרקט לחברה מובילה בתחום הספקת תרופות מיוחדות לחברות ביטוח עבור לקוחותיה המבוטחים בביטוחים משלימים, עבור ישראלים ללא ביטוחים משלימים, או תושבי חוץ המגיעים לישראל לקבלת טיפול רפואי מתקדם.
</p>
`
  const Activity4Heb = `
<p>
בימים אלה מסיימת מדי-מרקט תהליך של קבלת אישור משרד הבריאות למרכז הכנות בהתאם לנוהל המחמיר 135.
</p>
<p>
עם קבלת האישור, יתאפשר למדי-מרקט לספק הכנות לפי הזמנה ובכך להגדיל את מגוון המוצרים ואת איכות השירות הניתנת כיום  לבתי החולים, קופות החולים ובתי המרקחת.
</p>
`
  const Activity5Heb = `
<p>
מדי-מרקט הינה אחת משתי החברות המובילות בתחום רקיחת הכנות עבור מרפאות ווטרינריות. אלה מסופקות על פי הזמנה מיוחדת ובהתאם למרשם מאת הווטרינר.
</p>
`
  const Activity6Heb = `
<p>
למדי-מרקט הניסיון והידע באיתור יצרנים מהמובילים בעולם וקשרים ארוכי תווך עם יצרני סדרת המוצרים הרפואיים תחת המותג MEDICPRO הכוללת מגוון רחב מאוד של מוצרי חבישה, מזרקים, מחטים קטטרים, ציוד לחמצן ועוד
</p>
`
  const Activity7Heb = `
<p>
מגוון מוצרי החברה כולל מכשור רפאי מתקדם לחדרי ניתוח, הדמיה, אולטרסאונד, מעבדות דם, מוניטורים ועוד של יצרנים ומותגים בינלאומיים כמו MINDRAY, , SKYLA  , SunTech ,WOODLEועוד רבים אחרים.
</p>
<p>
לחברה מעבדת שירות וצוות מקצועי, מנוסה ומוביל המבצע התקנות, הדרכות ותיקונים.
</p>
`
  const Activity8Heb = `
<p>
המרלו"ג של מדי-מרקט הממוקם בעמק חפר כולל 6,000 מטר אחסנה בטמפרטורה מבוקרת לאלפי משטחי סחורה, המרלו"ג מתופעל באמצעות תוכנות מתקדמות והעבודה בו נעשית תחת רגולציה מחמירה ומוקפדת של רוקחי החברה האחראים בין היתר על האיכות.
</p>
<p>
בכל יום מוכנות מאות הזמנות ללקוחות החברה, אלו מופצות יום-יום ללקוחותינו באמצעות רכבים מבוקרי טמפרטורה ברמה הגבוהה ביותר תוך הקפדה על שירות מקצועי, איכותי ומהיר.
</p>`
  const Activity9Heb = `
<p>
צוות המכירות של מדי-מרקט כולל מנהלי תיקי לקוחות ואנשי שירות לקוחות מקצועיים ובעלי ידע רחב בתחום הרפואי, הקשרים הבין אישיים הרקומים בין צוות המכירות ללקוחות החברה הוא למעשה עמוד התווך המאפשר עשיה מקצועית ויעילה כל יום וכמעט בכל שעה.
</p>
`

  const Activity1Eng = `
<p>
Medi-Market is the leading company in Israel in the registration of generic drugs. Represents over 30 drug manufacturers from around the world, and has dozens of drugs registered or in the process of being registered.
</p>
`
  const Activity2Eng = `
<p>
Medi-Market is one of the leading suppliers of medicines that are in short supply in Israel or are not registered, which are supplied directly to hospitals and health funds.
</p>
`
  const Activity3Eng = `
<p>
As a business partner with dozens of pharmaceutical manufacturers and retailers around the world, Medi-Market has become a leading company in the field of supplying specialty drugs to insurance companies for its customers who are insured with supplementary insurance, for Israelis without supplementary insurance, or foreign residents who come to Israel for advanced medical care.
</p>
`
  const Activity4Eng = `
<p>
Medi-Market is currently completing a process of obtaining approval from the Ministry of Health for the Preparatory Center in accordance with the strict procedure 135.
</p>
<p>
Upon receipt of the approval, quite-market will be able to provide custom-made preparations and thus increase the range of products and the quality of service currently provided to hospitals, health funds and pharmacies.
</p>
`
  const Activity5Eng = `
<p>
Medi-Market is one of the two leading companies in the field of brewing preparations for veterinary clinics. These are provided by special order and according to a prescription from the veterinarian.
</p>
`
  const Activity6Eng = `
<p>
Fair-Market The experience and knowledge in locating the world's leading manufacturers and long-term relationships with the manufacturers of the medical product series under the MEDICPRO brand, which includes a very wide range of dressing products, syringes, catheter needles, oxygen equipment and more.
</p>
`
  const Activity7Eng = `
<p>
The company's product range includes advanced phantom equipment for operating rooms, imaging, ultrasound, blood laboratories, monitors and more from international manufacturers and brands such as MINDRAY, SKYLA, SunTech, WOODLE and many others.
</p>
<p>
The company has a service lab and a professional, experienced and leading team that performs installations, training and repairs. The company has a service lab and a professional, experienced and leading team that performs installations, training and repairs.
</p>
`
  const Activity8Eng = `
<p>
Medi-Market's Marlog located in the Hefer Valley includes 6,000 meters of controlled temperature storage for thousands of goods surfaces, the Marlog is operated using advanced software and the work is done under strict and meticulous regulation by the company's pharmacists who are responsible for quality, among other things.
</p>
<p>
Every day, hundreds of orders are prepared for the company's customers, these are distributed daily to our customers using temperature-controlled vehicles at the highest level while ensuring professional, quality and fast service.
</p>`
  const Activity9Eng = `
<p>
Medi-Market's sales team includes customer portfolio managers and professional customer service personnel with extensive knowledge in the medical field.
</p>
`

  return (
    <div className="img-text">
      <div className="container">
        <div className="h1-cont">
          <h1>{'תחומי פעילות'}</h1>
        </div>
        <div className="items">
          <div className="flex-container item">
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'רישום ויבוא תרופות'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity1Heb }}
                ></div>
              </div>
            </div>
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/rishum_med.png'}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={
                    'https://almedimarket.com/src/img/Trufot_mahlaka_pic.png'
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'יבוא תרופות מיוחדות לבתי חולים'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity2Heb }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'יבוא תרופות מיוחדות ללקוחות פרטיים ולחברות ביטוח'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity3Heb }}
                ></div>
              </div>
            </div>
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/special_med.png'}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/merkaz_hahanot.png'}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'מרכז הכנות'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity4Heb }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'מרכז הכנות וטרינריות'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity5Heb }}
                ></div>
              </div>
            </div>
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={
                    'https://almedimarket.com/src/img/merkaz_hahanot_vet.png'
                  }
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/import_medicpro.png'}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'יבוא ציוד רפואי :MEDICPRO'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity6Heb }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'יבוא מכשור רפואי'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity7Heb }}
                ></div>
              </div>
            </div>
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/import_med.png'}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 image">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/logistics_med.png'}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'לוגיסטיקה'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity8Eng }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-container item">
            <div className="col-lg-6 txt">
              <div className="wrapp">
                <div className="h1-cont">
                  <h1>{'שיווק, מכירות ותמיכה'}</h1>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: Activity9Heb }}
                ></div>
                <Link to={'/about/'}>
                  <button>{'צור קשר'}</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 image last-img">
              <div className="img">
                <img
                  src={'https://almedimarket.com/src/img/shivuk_med.png'}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComapnyActions
