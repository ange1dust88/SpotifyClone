import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../DataLayer'; 
import '../style/album.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';
import Release from './Release';
import AlbumsSong from './AlbumsSong';
import PlaylistCover from './PlaylistCover';



function Album() {
    const [{ artistId,token, playlistId }, dispatch] = useDataLayerValue();
    const [albumData, setAlbumData] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);

    function formatDate(dateString) {

        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    const extractYear = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString); 
    return dateObj.getFullYear(); 
    };
    
    useEffect(() => {
        const fetchAlbumDetails = async () => {
            if (!token || !playlistId) return;

            try {
                const response = await fetch(`https://api.spotify.com/v1/albums/${playlistId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch album details');
                }

                const albumData = await response.json();
                setAlbumData(albumData);
                setTracks(albumData.tracks.items); 
                console.log('Album data:', albumData);
            } catch (error) {
                console.error('Error fetching album details:', error);
            }
        };
        const fetchArtistAlbums = async () => {
            if (!artistId || !token) return;
        
            try {
              const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=6`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              if (!response.ok) {
                throw new Error('Failed to fetch singles');
              }
        
              const data = await response.json();
              setAlbums(data.items);
              console.log('Albums Albums:', data);
            } catch (error) {
              console.error('Error fetching singles:', error);
            }
          };

        fetchAlbumDetails();
        fetchArtistAlbums();
    }, [token, playlistId]);

    const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

    return (
        <div className="album">
            {albumData && (
                <>
                    <PlaylistCover
                        title={albumData.name}
                        img={albumData.images[0]?.url}
                        type={albumData.album_type} 
                        totalTracks={albumData.tracks.total}
                        totalDuration={totalDuration} 
                        date = {albumData.release_date}
                        isAlbum={true}
                        artists ={albumData.artists}
                    />

                    <div className="album__headers">
                        <p className="album__header album__index">#</p>
                        <p className="album__header">Title</p>
                        <p className="album__header"><FontAwesomeIcon icon={faClock} /></p>
                    </div>

                    <div className="album__body">
                        {tracks.map((track, index) => (
                            <AlbumsSong
                                songId={track.id}
                                index={index + 1}
                                title={track.name}
                                artists={track.artists}
                                duration={track.duration_ms}
                                playlistID={playlistId}
                                artist_id={albumData.artists?.id}
                            />
                        ))}
                    </div>

                    <div className="album__footer">
                        <div className="album__date">
                            {formatDate(albumData.release_date)}
                        </div>
                        <p className="album__details">
                            <p>©</p>
                            <p className="album__year">{extractYear(albumData.release_date)}</p>
                            <div className="album__artist"> {albumData.artists[0].name}</div>
                        </p>
                        <p className="album__details">
                            <p>℗</p>
                            <p className="album__year">{extractYear(albumData.release_date)}</p>
                            <div className="album__artist"> {albumData.artists[0].name}</div>
                        </p>
                    </div>

                    <div className="album__more">
                        <h1 className="album__more__title">
                            More by {albumData.artists[0].name}
                        </h1>

                        <div className="album__albums">
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
                </div>

                </>
            )}
        </div>
    );
}

export default Album;
