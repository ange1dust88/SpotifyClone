import React from 'react'
import '../style/body.css'
import Playlist from './Playlist'
import Profile from './Profile'
import Album from './Album'
import MainPage from './MainPage'
import { Routes, Route } from 'react-router-dom'
function Body( {spotify} ) {
  return (
    <div className='body'>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/artistsProfile" element={<Profile />} />
        <Route path="/album" element={<Album />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  )
}

export default Body
