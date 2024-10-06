import React, { useState, useEffect } from 'react';
import { useDataLayerValue } from '../DataLayer';
import '../style/rightsidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function RightSidebar() {
    const [{ token, item, playingPlaylistId }, dispatch] = useDataLayerValue();
    const [songData, setSongData] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const [playlistName, setPlaylistName] = useState(''); 

    useEffect(() => {
        const fetchSong = async () => {
            if (!token || !item) return;
            console.log(playingPlaylistId, 'platingplaylist');
    
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${item}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch song details');
                }
    
                const data = await response.json();
                setSongData(data);
                console.log(data);
    
                if (data.artists && data.artists.length > 0) {
                    const artistId = data.artists[0].id;
                    setPlayingArtistId(artistId);
                    fetchArtist(artistId);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        const fetchPlaylist = async () => {
            if (!token || !playingPlaylistId) return;
    
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playingPlaylistId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist details');
                }
    
                const playlistData = await response.json();
                setPlaylistName(playlistData.name);
                console.log('Playlist data:', playlistData);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchSong();
        fetchPlaylist();
        
    }, [token, item]);

    const setArtistId = (id) => {
        if(id){
          dispatch({
            type: 'SET_ARTIST',
            artistId: id,
          });
        }
    };

    const setPlayingArtistId = (id) => {
        if (id) {
            dispatch({
                type: 'SET_PLAYING_ARTIST_ID',
                artistId: id,
            });
        }
    };

    const fetchArtist = async (artistId) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch artist details');
            }

            const data = await response.json();
            setArtistData(data);
            console.log('Artist data:', data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='right__sidebar'>
            {songData && (
                <>
                    <div className="right__header">
                        <div className="right__name">
                            <h3 className="right__playlist">
                                {playlistName ? playlistName : songData.artists[0].name}
                            </h3>
                                <FontAwesomeIcon icon={faXmark} className='exit'/>
                        </div>
                        <div className="right__img__container">
                            <img src={songData.album.images[0].url} alt={songData.name} className='right__img' />
                        </div>
                        <div className="right__main">
                            <h3 className="right__title">{songData?.name}</h3>
                            <div className='right__artists'>
                                {songData.artists.map((artist, index) => {
                                    return (
                                        <React.Fragment key={artist.id}>
                                            <Link to='/artistsProfile' style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <p className='right__artist' onClick={() => setArtistId(artist.id)}>
                                                    {artist.name}
                                                </p>
                                            </Link>
                                            {index < songData.artists.length - 1 && ', '}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="about__artist right__container" onClick = { () => setArtistId(artistData.id)}>
                        <Link to='/artistsProfile' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2 className='right__tit'>About the artist</h2>
                            {artistData && (
                                <>
                                    <img src={artistData.images?.[0]?.url || ""} alt={artistData.name} className='rsb__artist__img' />
                                    <p className='rsb__artist__name'>{artistData.name}</p>
                                    <p className='rsb__artist__followers'>Followers: {artistData.followers.total.toLocaleString()}</p>
                                </>
                            )}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default RightSidebar;
