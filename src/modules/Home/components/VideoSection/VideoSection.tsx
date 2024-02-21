import React from 'react'
import { Link } from 'react-router-dom'
import GalaxtVideo from '../GalaxyVideo/GalaxtVideo'
const VideoSection = () => {
  return (
    <section
      id="page1-my"
      className="section entry-section"
      style={{ position: 'relative' }}
    >
      <GalaxtVideo />
      <div className={true ? 'showcase animated fadeInDown' : 'showcase'}>
        <h1 className="h1-2">
          {'ברוכים הבאים למדי מרקט  המקור שלך לתרופות וציוד רפואי בישראל'}
        </h1>
        <Link to={'/client/catalog/0/0/0?page=1'}>
          <div className="button-cls">
            <p>{'לקטלוג המלא'}</p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default VideoSection
