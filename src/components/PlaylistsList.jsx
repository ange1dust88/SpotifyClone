import React from 'react';
import '../style/playlistslist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function PlaylistsList({ title, img, owner, onSelect }) {
  return (
    <Link to ='/playlist' style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className='playlists__list' onClick={onSelect}> 
      <div className="playlist__img">
        <div className="playlist__filter"></div>
        <FontAwesomeIcon className='play__icon' icon={faPlay} />
        <img src={img} alt={title} />
      </div>
      <div className="playlist__info">
        <p className='playlist__title'>{title}</p>
        <p className='playlist__author'>{owner}</p>
      </div>
    </div>
    </Link>
  );
}

export default PlaylistsList;
