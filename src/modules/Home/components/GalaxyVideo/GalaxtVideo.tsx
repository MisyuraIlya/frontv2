import React from 'react'

const GalaxtVideo = () => {
  return (
    <div>
      <div
        className="pre-showcase"
        dangerouslySetInnerHTML={{
          __html: `
		<video
			id="showcase"
			preload="preload"
			loop
			muted
			autoplay
			playsInline
			webkit-playsInline
			x-webkit-airplay="allow"
			poster="${process.env.REACT_APP_MEDIA}/poster.jpg"
			className="video-background">
			{window.innerWidth > 1200 ?
				<source src="${process.env.REACT_APP_MEDIA}/video.mp4" type="video/mp4" /> :
				<source src="${process.env.REACT_APP_MEDIA}/video.webm" type="video/webm" />	}
			</video>
			`,
        }}
      ></div>
    </div>
  )
}

export default GalaxtVideo
