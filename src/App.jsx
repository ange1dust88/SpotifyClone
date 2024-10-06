import { useEffect, useState } from 'react'
import './style/App.css'
import Login from './components/Login.jsx'
import Player from './components/Player.jsx'
import { getTokenFronUrl } from './spotify.jsx'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer.jsx'
const spotify = new SpotifyWebApi();
function App() {

  {/* 
    hover to img in albums  done (add anim)
    
    
      fix artist profile(img losing their size if name of the artist is too big )
    
      when open new album, profile etc scroll to the top and add some anim
      add navigation
      more artist's albums in albums


      main page
      discography page


      Search
      Lyrics

    */}  
  
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect( () => {
    const hash = getTokenFronUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if(_token){
      dispatch( {
        type: 'SET_TOKEN',
        token: _token
      })
      spotify.setAccessToken(_token);
      spotify.getMe().then( user => {
        console.log(user);
        dispatch( {
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      });
    }
  }, []);

  return (
      <div className="app">
        {
          token ? (
            <Player spotify = {spotify} />
          ) : (
            <Login />
          )
        }
      </div>
  )
}

export default App
