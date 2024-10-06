import { useState, useEffect } from 'react';
import { useDataLayerValue } from '../DataLayer'; 
import Release from './Release';
import Vibrant from 'node-vibrant';
import Song from './Song';
import Artist from './Artist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis, faCirclePause } from '@fortawesome/free-solid-svg-icons';

import '../style/profile.css';

const Profile = () => {
  const [{ token, artistId}, dispatch] = useDataLayerValue();
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [singles, setSingles] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistData, setArtistData] = useState(null);
  const [bgGradient, setBgGradient] = useState('');
  const [musicPaused, setMusicPause] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [discographyState, setDiscographyState] = useState('Albums');

  const displayedTracks = showAll ? topTracks.slice(0, 10) : topTracks.slice(0, 5);
  const handleToggle = () => setShowAll((prevShowAll) => !prevShowAll);


  const fetchArtistDetails = async () => {
    if (!artistId || !token) return; 

    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artist details');
      }

      const data = await response.json();
      setArtistData(data);

      if (data.images.length > 0) {
        Vibrant.from(data.images[0].url)
          .getPalette()
          .then((palette) => {
            const vibrantColor = palette.Vibrant?.hex || '#000';
            const mutedColor = palette.Muted?.hex || '#333';
            setBgGradient(`linear-gradient(to bottom right, ${vibrantColor}, ${mutedColor})`);
          })
          .catch((err) => console.error('Error extracting colors:', err));
      }
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };

  useEffect(() => {
    fetchArtistDetails();
  }, [artistId, token]); 

  useEffect(() => {
    if (artistId && token) {
      fetchArtistAlbums();
      fetchTopTracks();
      fetchArtistSingles();
      fetchRealtedArtists();
    }
  }, [artistId, token]);

  const fetchArtistAlbums = async () => {
    if (!artistId || !token) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=6`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      setAlbums(data.items);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchArtistSingles = async () => {
    if (!artistId || !token) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=6&include_groups=single`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch singles');
      }

      const data = await response.json();
      setSingles(data.items);
      console.log('Singles:', data);
    } catch (error) {
      console.error('Error fetching singles:', error);
    }
  };

  const fetchTopTracks = async () => {
    if (!artistId || !token) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
      }

      const data = await response.json();
      setTopTracks(data.tracks);
      console.log('Top Tracks:', data);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const fetchRealtedArtists = async () => {
    if (!artistId || !token) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch related artists');
      }

      const data = await response.json();
      setRelatedArtists(data.artists.slice(0, 6));
      console.log('Related Artists:', data);
    } catch (error) {
      console.error('Error fetching related artists:', error);
    }
  };

    return (
        <div className="profile">
            {artistData && (
                <div style={{ background: bgGradient }}>
                    <div className="profile__header">
                        <div className="profile__image__wrapper">
                            {artistData.images[0]?.url ? (
                                <img src={artistData.images[0]?.url} alt={artistData.name} className="profile__image" />
                            ) : (
                                console.log('no img available')
                            )}
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__name">{artistData.name}</h1>
                            <p className="profile__followers">{artistData.followers.total.toLocaleString()} followers</p>
                        </div>

                    </div>
                        <div className="profile__controls">
                            {musicPaused ? <FontAwesomeIcon icon={faCirclePlay} className="playlist__play" onClick={() => setMusicPause(!musicPaused)}/> : <FontAwesomeIcon icon={faCirclePause} className="playlist__play" onClick={() => setMusicPause(!musicPaused)} />}
                            <FontAwesomeIcon icon={faEllipsis} className="playlist__options"/>
                        </div>
                </div>
                
            )}

            <div className="profile__popular">
                <h3 className='profile__chapter__name'>Popular</h3>
                <div className="profile__toptracks">
                {displayedTracks.map((track, index) => (
                    track.album?.images[0]?.url ? (
                    <Song
                        key={track.id}
                        index={index + 1}
                        title={track.name}
                        img={track.album.images[0]?.url}
                        duration={track.duration_ms}
                        songId={track.id}
                        shortInfo={true}
                        artist_id={artistId}
                    />
                    ) : (
                    console.log(`No image available for track: ${track.name}`)
                    )
                ))}
                <button className="profile__toptracks__button" onClick={handleToggle}>
                    {showAll ? 'Show Less' : 'Show More'}
                </button>
                </div>
            </div>
            <div className="profile__discography">
                <h3 className='profile__chapter__name'>Discography</h3>
                <div className="profile__navs">
                <p 
                    className={`profile__nav ${discographyState === 'Albums' ? 'active' : ''}`} 
                    onClick={() => setDiscographyState('Albums')}
                >
                    Albums
                </p>
                <p 
                    className={`profile__nav ${discographyState === 'Singles' ? 'active' : ''}`} 
                    onClick={() => setDiscographyState('Singles')}
                >
                    Singles and EP's
                </p>
                </div>
                {discographyState == 'Albums' ?(

                <div className="profile__albums">
                    {albums.map((album) => (
                        <Release 
                            albumId={album.id}
                            image={album.images[0]?.url}
                            name={album.name}
                            date={album.release_date}
                            type={album.album_type}
                        />
                    ))}
                </div>
                ) : (

                <div className="profile__albums">
                {singles.map((single) => (
                    <Release 
                        albumId={single.id}
                        image={single.images[0]?.url}
                        name={single.name}
                        date={single.release_date}
                        type={single.album_type}
                    />
                ))}
                </div>

                )

                }

            </div>
            <div className="profile__fans__also__like">
                <h3 className="profile__chapter__name">Fans also like</h3>
                <div className="profile__related_artists">
                {relatedArtists.map((artist) => (
                        <Artist 
                                image={artist.images[0]?.url}
                                name={artist.name}
                                type={artist.type}
                                id ={artist.id}
                                className="artist"
                            />
                        
        
                ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
