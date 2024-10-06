import React, { useEffect, useState } from 'react';
import '../style/mainpage.css';
import { useDataLayerValue } from '../DataLayer';
import Release from './Release';

function MainPage() {
    const [{ token }, dispatch] = useDataLayerValue();
    const [madeForYouPlaylists, setMadeForYouPlaylists] = useState([]);

    const fetchMadeForYouPlaylists = async () => {
        try {
            const artistsResponse = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!artistsResponse.ok) {
                throw new Error('Failed to fetch top artists');
            }

            const artistsData = await artistsResponse.json();
            const topArtists = artistsData.items.map(artist => artist.id);
            const recommendationsResponse = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${topArtists.join(',')}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!recommendationsResponse.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const recommendationsData = await recommendationsResponse.json();
            setMadeForYouPlaylists(recommendationsData.tracks);
        } catch (error) {
            console.error('Error fetching made for you playlists:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchMadeForYouPlaylists();
        }
    }, [token]);

    return (
        <div className='mainpage'>
            <h1>Made For You</h1>
            {madeForYouPlaylists.length > 0 ? (
                madeForYouPlaylists.map(track => (
                    <Release 
                        albumId={track.id}
                        image ={track.images[0].url} 
                        
                    />
                ))
            ) : (
                console.log('no recommendations')
            )}
        </div>
    );
}

export default MainPage;
