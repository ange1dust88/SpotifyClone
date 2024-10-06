import React, { useEffect, useState } from 'react';
import Vibrant from 'node-vibrant';
import '../style/playlistcover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useDataLayerValue } from '../DataLayer';
import { Link } from 'react-router-dom';

function PlaylistCover({ title, img, type, totalTracks, owner, ownerAvatar, totalDuration, date, isAlbum, artists }) {
  const [bgGradient, setBgGradient] = useState('transparent');
  const [musicPaused, setMusicPause] = useState(true);
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [{},dispatch] = useDataLayerValue();

  const formatDuration = (durationMs) => {
    const totalMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hr ${minutes} min`;
  };

  const extractYear = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString); 
    return dateObj.getFullYear(); 
  };

  const setArtistId = (id) => {
    if (id) {
      dispatch({
        type: 'SET_ARTIST',
        artistId: id,
      });
    }
  };

  useEffect(() => {
    if (img) {
      Vibrant.from(img)
        .getPalette()
        .then((palette) => {
          const vibrantColor = palette.Vibrant?.hex || '#000';
          const mutedColor = palette.Muted?.hex || '#333';
          setBgGradient(`linear-gradient(to bottom right, ${vibrantColor}, ${mutedColor})`);
        })
        .catch((err) => {
          console.error('Error extracting colors: ', err);
        });
    }
  }, [img]);

  return (
    <>
      <div style={{ background: bgGradient }}>
        <div className='playlist__cover'>
          {isAlbum ? (
            <div className="cover__img__wrapper__album" onClick={() => setIsImgVisible(true)}>
              <img src={img} alt={title} className="cover__img__album" crossOrigin="anonymous" />
            </div>
          ) : (
            <div className="cover__img__wrapper">
              <img src={img} alt={title} className="cover__img" crossOrigin="anonymous" />
            </div>
          )}
          <div className="cover__info">
            <p className="cover__type">{type}</p>
            <h1 className="cover__title">{title}</h1>
            <div className="cover__wideinfo">
              {ownerAvatar && (
                <img src={ownerAvatar} alt={owner} className="cover__avatar" />
              )}

              {isAlbum ? (
                <Link to='/artistsProfile' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p className="cover__artists">
                    {artists.map((artist) => (
                      <>
                        <span key={artist.id}>
                          <span className='cover__artist' onClick={() => setArtistId(artist.id)}>{artist.name}</span>
                        </span>
                        •
                      </>
                    ))}
                  </p>
                </Link>
              ) : (
                <>
                  <p className="cover__owner">{owner}</p>
                  •
                </>
              )}
              
              {date && (
                <>
                  <p className="cover__date">{extractYear(date)}</p>
                  •
                </>
              )}
              <p className="cover__total">{totalTracks} songs</p>
              •
              <p className="cover__duration">{formatDuration(totalDuration)}</p>
            </div>
          </div>
        </div>
        <div className="playlist__controls">
          {musicPaused ? (
            <FontAwesomeIcon icon={faCirclePlay} className="playlist__play" onClick={() => setMusicPause(!musicPaused)} />
          ) : (
            <FontAwesomeIcon icon={faCirclePause} className="playlist__play" onClick={() => setMusicPause(!musicPaused)} />
          )}
          <FontAwesomeIcon icon={faEllipsis} className="playlist__options" />
        </div>
      </div>
      {isImgVisible && (
        <div className="cover__hidden">
          <div className="cover__wrapper__hidden">
            <img src={img} alt={title} className="cover__img__hidden" />
            <p className="hidden__close" onClick={() => setIsImgVisible(false)}>Close</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaylistCover;
