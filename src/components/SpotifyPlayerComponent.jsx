import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function SpotifyPlayerComponent({accessToken, trackUri}) {
  return (
    <div>
        <SpotifyPlayer 
        token ={accessToken} 
        uris = {trackUri ? [trackUri] : []}
        play = {true}/>
    </div>
  )
}

export default SpotifyPlayerComponent
