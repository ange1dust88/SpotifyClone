import React from 'react';
import '../style/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer';

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000); 
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0'); 
  return `${minutes}:${seconds}`;
};

function Song({ index, title, img, author, album, dateAdded, duration, songId, shortInfo, playlistID, artist_id }) {
  const [{ item,artistId}, dispatch] = useDataLayerValue(); 

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
    <>
      {shortInfo ? (
        <div className="song__short">
            <div className="song__index__short">
              <FontAwesomeIcon className="song__icon__short" icon={faPlay} onClick={() => setSongId(songId)}/>
              {index}
            </div>
          <div className="song__details__short">
              <div className="song__imgwrapper">
                <img src={img} className="song__img" alt={title} />
              </div>
              <div>
                <h4 className="song__title">{title}</h4>
              </div>
            </div>
          <div className="song__duration">{formatDuration(duration)}</div>
        </div>
      ) : (
      
        <div className="song">
          <div className="song__index">
            <FontAwesomeIcon className="song__icon" icon={faPlay} onClick={() => setSongId(songId)} />
            {index}
          </div>
          <div className="song__details">
            <div className="song__imgwrapper">
              <img src={img} className="song__img" alt={title} />
            </div>
            <div>
              <h4 className="song__title">{title}</h4>
              <Link to='/artistsProfile'  style={{ textDecoration: 'none', color: 'inherit' }}>
                <p className="song__author" onClick={ () => setArtistId(artist_id)}>{author}</p>
              </Link>
            </div>
          </div>
          <div className="song__album">{album}</div>
          {dateAdded && (
            <div className="song__date">
              {new Date(dateAdded).toLocaleDateString()}
            </div>
          )}
          <div className="song__duration">{formatDuration(duration)}</div>
        </div>
      )}
    </>
  );
}

export default Song;
