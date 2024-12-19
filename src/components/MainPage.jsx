import React, { useEffect, useState } from 'react';
import '../style/mainpage.css';
import { useDataLayerValue } from '../DataLayer';
import Release from './Release';


function MainPage() {
    const [{ token }] = useDataLayerValue();
    const [newReleases, setNewReleases] = useState([]);
    const [year, setYear] = useState([]);
    const [rock, setRock] = useState([]);
    const [rap, setRap] = useState([]);

    const fetchNewReleases = async () => {
        try {
            // Fetch new releases
            const response = await fetch(
                `https://api.spotify.com/v1/browse/new-releases`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch new releases');
            }

            const data = await response.json();
            setNewReleases(data.albums.items); 
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    };

    const fetchYear = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=year:2024&type=album`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (!response.ok) {
                console.error('Response status:', response.status, response.statusText);
                throw new Error('Error fetching year');
            }
    
            const data = await response.json();

            setYear(data.albums.items);
        } catch (error) {
            console.error('Error fetching year:', error);
        }
    };

    const fetchRock = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=nirvana&type=album`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (!response.ok) {
                console.error('Response status:', response.status, response.statusText);
                throw new Error('Error fetching Rock');
            }
    
            const data = await response.json();
            console.log('Rock:', data); 
            setRock(data.albums.items); 
        } catch (error) {
            console.error('Error fetching rock:', error);
        }
    };

    const fetchRap = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=xxxtentation&type=album`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (!response.ok) {
                console.error('Response status:', response.status, response.statusText);
                throw new Error('Error fetching Rap');
            }
    
            const data = await response.json();
            console.log('Rap:', data); 
            setRap(data.albums.items); 
        } catch (error) {
            console.error('Error fetching rap:', error);
        }
    };
    

    useEffect(() => {
        if (token) {
            fetchNewReleases();
            fetchYear();
            fetchRock();
            fetchRap();
        }
    }, [token]);

    return (
        <div className="mainpage">
            <h1 className="mainpage__title">New Releases</h1>

            <div className="mainpage__container">
                {newReleases.length > 0 ? (
                    newReleases.map(album => (
                        <Release
                            key={album.id}
                            albumId={album.id}
                            image={album.images[0]?.url}
                            name={album.name}
                            type = {album.type}
                            date = {album.release_date}

                        />
                    ))
                ) : (
                    <p>No new releases available. Try again later!</p>
                )}
            </div>

            <h1 className="mainpage__title">2024 Releases</h1>

            <div className="mainpage__container">
                {year.length > 0 ? (
                    year.map(album => (
                        <Release
                            key={album.id}
                            albumId={album.id}
                            image={album.images[0]?.url}
                            name={album.name}
                            type = {album.type}
                            date = {album.release_date}

                        />
                    ))
                ) : (
                    <p>No new releases available. Try again later!</p>
                )}
            </div>
            <h1 className="mainpage__title">Rock music</h1>

            <div className="mainpage__container">
                {rock.length > 0 ? (
                    rock.map(album => (
                        <Release
                            key={album.id}
                            albumId={album.id}
                            image={album.images[0]?.url}
                            name={album.name}
                            type = {album.type}
                            date = {album.release_date}

                        />
                    ))
                ) : (
                    <p>No new rock music. Try again later!</p>
                )}
            </div>
            <h1 className="mainpage__title">Rap music</h1>

            <div className="mainpage__container">
                {rap.length > 0 ? (
                    rap.map(album => (
                        <Release
                            key={album.id}
                            albumId={album.id}
                            image={album.images[0]?.url}
                            name={album.name}
                            type = {album.type}
                            date = {album.release_date}

                        />
                    ))
                ) : (
                    <p>No new rap music. Try again later!</p>
                )}
            </div>
          
        </div>
    );
}

export default MainPage;
