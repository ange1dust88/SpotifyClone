import React, { useState } from 'react';
import '../style/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import PlaylistsList from './PlaylistsList.jsx';
import { useDataLayerValue } from '../DataLayer';



function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const handlePlaylistSelect = (id) => {
    if (id) {
      dispatch({
        type: 'SET_PLAYLIST_ID', 
        playlistId: id,
      });
      
    }

  };

  return (
    <div className='sidebar'>
      <div className="sidebar__nav">
        <h4 className='sidebar__library'><FontAwesomeIcon icon={faSuitcase} /> Your Library</h4>
        <div className="sidebar__icons">
          <a href=""><FontAwesomeIcon icon={faPlus} /></a>
          <a href=""><FontAwesomeIcon icon={faArrowRight} /></a>
        </div>
      </div>
      <div className="sidebar__playlists">
        <h4>Playlists</h4>
        {playlists?.items?.map(playlist => (
          <PlaylistsList 
            key={playlist.id}
            title={playlist.name}
            img={playlist.images[0]?.url}
            owner={playlist.owner.display_name}
            onSelect={() => handlePlaylistSelect(playlist.id)} 
          />
        ))}
      </div>

    </div>
  );
}

export default Sidebar;
