import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import Song from './Song';
import PlaylistCover from './PlaylistCover'; 
import '../style/playlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock} from '@fortawesome/free-solid-svg-icons';

function Playlist({ }) {
  const [{ playlistId, token }] = useDataLayerValue();
  const [tracks, setTracks] = useState([]);
  const [playlistData, setPlaylistData] = useState(null); 
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!playlistId) return;

      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setTracks(data.tracks.items);
        setPlaylistData(data);
        const ownerId = data.owner.id;
        const responseUser = await fetch(`https://api.spotify.com/v1/users/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await responseUser.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching playlist or user details:', error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId, token]);

  const totalDuration = tracks.reduce((sum, track) => sum + track.track.duration_ms, 0);

  return (
    <div className="playlist">
      {playlistData && (
        <PlaylistCover
          title={playlistData.name}
          img={playlistData.images[0]?.url}
          type={playlistData.type}
          totalTracks={playlistData.tracks.total}
          owner={playlistData.owner.display_name}
          ownerAvatar={userData?.images?.[0]?.url} 
          totalDuration={totalDuration} 
          
        />
      )}

      <div className="playlist__headers">
        <p className="playlist__header playlist__index">#</p>
        <p className="playlist__header">Title</p>
        <p className="playlist__header">Album</p>
        <p className="playlist__header">Date added</p>
        <p className="playlist__header">
          <FontAwesomeIcon icon={faClock} />
        </p>
      </div>

      <div className="playlist__body">
        {tracks.map((track, index) => (
          <Song
            key={track.track.id}
            index={index + 1}
            title={track.track.name}
            img={track.track.album.images[0]?.url}
            author={track.track.artists[0].name}
            album={track.track.album.name}
            dateAdded={track.added_at}
            duration={track.track.duration_ms}
            songId={track.track.id}
            shortInfo ={false}
            playlistID = {playlistId}
            artist_id={track.track.artists[0].id}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
