import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer';


import '../style/albumssong.css'

function AlbumsSong({ index, title, artists, duration, songId, playlistID }) {
  const [{}, dispatch] = useDataLayerValue(); 

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000); 
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0'); 
    return `${minutes}:${seconds}`;
  };

  const setSongId = (id) => {
    if (id) {
      dispatch({
        type: 'SET_ITEM',
        item: id,
      });
      dispatch({
        type: 'SET_PLAYING_PLAYLIST_ID',
        playingPlaylistId: playlistID, 
      });
    }
  };

  const setArtistId = (id) => {
    if(id){
      dispatch({
        type: 'SET_ARTIST',
        artistId: id,
      });
    }
  }

  return (
    <div className="asong">
      <div className="asong__index">
        <FontAwesomeIcon className="asong__icon" icon={faPlay} onClick={() => setSongId(songId)} /> 
        {index}
      </div>
      <div className="asong__details">
        <div>
          <h4 className="asong__title">{title}</h4>
          <div className='asong__artists'>
            {artists.map((artist, idx) => (
              <React.Fragment key={artist.id}>
                <Link to='/artistsProfile' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p className='asong__artist' onClick={() => setArtistId(artist.id)}>
                    {artist.name}
                  </p>
                </Link>
                {idx < artists.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="asong__duration">{formatDuration(duration)}</div>
    </div>
  )
}

export default AlbumsSong;
