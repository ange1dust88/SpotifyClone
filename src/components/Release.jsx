import React from 'react';
import '../style/release.css';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDataLayerValue } from '../DataLayer';
import { Link } from 'react-router-dom';

function Release({ albumId, image, name, date, type }) {

  const year = date.match(/^\d{4}/)[0];

  const [{}, dispatch] = useDataLayerValue();

  const setAlbumId = (id) => {
    if (id) {
      dispatch({
        type: 'SET_PLAYLIST_ID', 
        playlistId: id,          
      });

    }
  };

  return (
      <div className='release' onClick={() => setAlbumId(albumId)}>
      <Link to='/album' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="release__image__wrapper">
          <img src={image} alt={name} className="release__image" />
          <FontAwesomeIcon icon={faCirclePlay} className='release__play' />
        </div>
        <h3 className="release__name">{name}</h3>
        <div className='release__info'>
          <span className="release__year">{year}</span>
          <span> • </span>
          <span className="release__type">{type}</span>
        </div>
    </Link>
      </div>
  );
}

export default Release;
