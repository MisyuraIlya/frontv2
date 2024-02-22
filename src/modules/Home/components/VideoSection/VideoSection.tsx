import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Container, Paper, Box } from '@mui/material'

const VideoSection = () => {
  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
      background: '#fff', // Add background color
    } as React.CSSProperties,

    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: '0',
      left: '0',
      filter: 'brightness(50%)', // Add brightness filter
    } as React.CSSProperties,
    showcase: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#fff',
    } as React.CSSProperties,
    title: {
      width: '90%',
      marginBottom: '120px',
    } as React.CSSProperties,
  }

  return (
    <Box style={styles.videoContainer}>
      <Paper elevation={0}>
        <video
          style={styles.video}
          preload="preload"
          loop
          muted
          autoPlay
          playsInline
          webkit-playsInline
          x-webkit-airplay="allow"
          poster={`${process.env.REACT_APP_MEDIA}/poster.jpg`}
        >
          {window.innerWidth > 1200 ? (
            <source
              src={`${process.env.REACT_APP_MEDIA}/video.mp4`}
              type="video/mp4"
            />
          ) : (
            <source
              src={`${process.env.REACT_APP_MEDIA}/video.webm`}
              type="video/webm"
            />
          )}
        </video>
      </Paper>
      <Box style={styles.showcase}>
        <Box className="centered">
          <Typography variant="h3" style={styles.title}>
            ברוכים הבאים למדי מרקט המקור שלך לתרופות וציוד רפואי בישראל
          </Typography>
        </Box>
        <Link to="/client/catalog/0/0/0?page=1">
          <Button variant="contained" color="secondary">
            לקטלוג המלא
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default VideoSection
