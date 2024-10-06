import React from 'react'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import { useDataLayerValue } from '../DataLayer'; 
import '../style/player.css'
import RightSidebar from './RightSidebar'
function Player( {spotify} ) {
  const [{ token, item}, dispatch] = useDataLayerValue();
  return (
    <div className='player'>
        <Header />
        <div className="player__body">
            <Sidebar />
            <Body spotify = {spotify}/>
            {item && (
              <RightSidebar />
            )}
        </div>
        <Footer/>
    </div>
  )
}

export default Player
