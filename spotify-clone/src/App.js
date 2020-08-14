import React, {useEffect} from 'react'
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import {useDataLayerValue} from './DataLayer';
const spotify = new SpotifyWebApi();

function App() {
  // const [token,setToken] = useState('');
  const [{user,token},dispatch] = useDataLayerValue();
    //Run code based on a given condition
    useEffect(() => {  
        const hash = getTokenFromUrl();
        window.location.hash="";
        const _token = hash.access_token;
        if(_token){
          dispatch({
            type:'SET_TOKEN',
            token: _token
          })

          spotify.setAccessToken(_token);
            spotify.getMe()
              .then(user =>{
                console.log('person : ',user);
                dispatch({
                  type: 'SET_USER', 
                  user: user
                })
          })

          spotify.getUserPlaylists().then((playlists)=>{
            console.log('playlists ',playlists)
            dispatch({
              type: 'SET_PLAYLIST',
              playlists: playlists
            });
          });

          spotify.getPlaylist('1nNMfHo8o03gmsfFR9hned')
            .then(response=>{
              console.log('*****response****',response)
              dispatch({
                type: "SET_DISCOVER_WEEKLY",
                discover_weekly: response
              })
            })
        }
    },[])

    console.log('Data layer ',user);
    console.log('Data layer token ',token);

  return (
    <div className="app">
      {
        token ? (
         <Player spotify={spotify}/>
        ) : (
          <Login/>
        )
      }
    </div>
  );
} 

export default App;
