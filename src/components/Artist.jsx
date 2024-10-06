import React from 'react'
import '../style/artist.css' 
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDataLayerValue } from '../DataLayer';

function Artist( {image, name, type, id} ) {
    const [{ artistId }, dispatch] = useDataLayerValue(); 

    const setArtistId = (id) => {
        if (id) {
            dispatch({
                type: 'SET_ARTIST',
                artistId: id, 
            });
            console.log('Dispatched artistId:', id);
        }
    };
  return (
    <div className='artist' onClick={() => setArtistId(id)}>
        <div className="artist__image__wrapper">
            <img src={image} alt="" className="artist__image" />
            <FontAwesomeIcon icon={faCirclePlay} className='artist__play'/>
        </div>
        <h2 className="artist__name">{name}</h2>
        <p className="artist__type">{type}</p>
    </div>
  )
}

export default Artist
