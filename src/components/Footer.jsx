import { useEffect, useState } from 'react';
import '../style/footer.css';
import { useDataLayerValue } from '../DataLayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowMaximize, faMicrophone, faCirclePlay, faCirclePause, faForwardStep, faBackwardStep, faShuffle, faRepeat, faVolumeLow, faVolumeHigh, faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons';
import SpotifyPlayerComponent from './SpotifyPlayerComponent';
function convertMsToMinutes(ms) {
    const minutes = Math.floor(ms / 60000); 
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0'); 
    return `${minutes}:${seconds}`;
}
const Footer = () => {
    const [{ token, item }, dispatch] = useDataLayerValue();
    const [songData, setSongData] = useState(null); 
    const [musicPaused, setMusicPause] = useState(true);
    const [volume, setVolume] = useState(50);
    const [timing, setTiming] = useState(10);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredVolume,setIsHoveredVolume] = useState(false);
    useEffect(() => {
        const fetchSong = async () => {
            if (!token || !item) return; 

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
            } catch (error) {
                console.error(error);
            }
        };

        fetchSong();
    }, [token, item]);

    const setArtistId = (id) => {
        if(id){
          dispatch({
            type: 'SET_ARTIST',
            artistId: id,
          });
        }
        console.log(id, 'artistId');
    };

    return (
        <div className='footer'>
          {songData && songData.album && songData.album.images.length > 0 && (
            <div className="footer__left">

                <div className="footer__img__wrapper">   
                  <img src={songData.album.images[0].url} alt={songData.name} className='footer__img' />
                </div>
                <div className="footer__song__details">
                  <h4 className='footer__name'>{songData.name}</h4>
                  <div className='footer__artists'>
                    {songData.artists.map((artist, index) => {
                        
                    return (
                        <>
                            <p className='footer__artist' onClick={ () => setArtistId(artist.id)}>
                                {artist.name}
                            </p>
                            {index < songData.artists.length - 1 && ',  '}
                        </>
                    );
                })}
                  </div>
        

                </div>
                
            </div>
            )}

            <div className="footer__middle">
                {songData && (
                    <>
                        <div className="middle__upper">
                            <FontAwesomeIcon icon={faShuffle} className='footer__icon'/>
                            <FontAwesomeIcon icon={faBackwardStep} className='footer__icon' />
                            {musicPaused ? <FontAwesomeIcon icon={faCirclePlay}  onClick={() => setMusicPause(!musicPaused)} className='footer__play footer__icon'/> : <FontAwesomeIcon icon={faCirclePause}  onClick={() => setMusicPause(!musicPaused) } className='footer__play' />}
                            <FontAwesomeIcon icon={faForwardStep} className='footer__icon'/>
                            <FontAwesomeIcon icon={faRepeat} className='footer__icon'/>
                        </div>
                        <div className="timer__container">
                            <span className="currentTime">0:00</span>
                            <input 
                                type="range" 
                                className="time__slider progress__bar" 
                                min="0" 
                                max="100" 
                                value={timing} 
                                style={{
                                    background: isHovered 
                                        ? `linear-gradient(to right, #1DB954 ${timing}%, #4D4D4D ${timing}%)` 
                                        : `linear-gradient(to right, white ${timing}%, #4D4D4D ${timing}%)`,
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />
                            <span className="totalTime">{convertMsToMinutes(songData.duration_ms)}</span>
                        </div>
                    </>
                    
                    
                  
                )}
            </div>

                {songData && (
            <div className="footer__right">
                <>
                <FontAwesomeIcon icon={faWindowMaximize} className='footer__icon' />
                <FontAwesomeIcon icon={faMicrophone} className='footer__icon' />
                {volume<=50  ? (
                    <FontAwesomeIcon icon={faVolumeLow} className='footer__icon' /> ) : ( <FontAwesomeIcon icon={faVolumeHigh} className='footer__icon' /> )
                }
                <div class="volume__control">
                    <input type="range" 
                    className="volume__slider progress__bar" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    style={{
                        background: isHoveredVolume 
                                        ? `linear-gradient(to right, #1DB954 ${volume}%, #4D4D4D ${volume}%)` 
                                        : `linear-gradient(to right, white ${volume}%, #4D4D4D ${volume}%)`,
                      }}
                      onMouseEnter={() => setIsHoveredVolume(true)}
                      onMouseLeave={() => setIsHoveredVolume(false)}
                    />
                </div>
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='footer__icon' />
                </>
                
            </div>
                )}

        </div>
    );
}

export default Footer;
