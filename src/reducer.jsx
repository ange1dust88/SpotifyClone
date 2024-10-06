export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    token: null,
    item: null,
    artistId: null,
    playlistId: null,
    playingArtistId: null,
    playingPlaylistId: null,
    
}
{/* 'BQBljgBXaXCh80rSgAuaHOl0ScYfMP3GGKXcbMY0DhT3dh-ZXvNPOpVN7OIU_6bY170TQesNBzdeLW1geizC4g6LC4XXdM5-RlU2KlUON04DdUi4j0U0DikkaplhZLmOYOt8bYT0h5XmqIN1b--tg5G5CV-nGpIGJwdJ-AnOH80JIXe1eCgZSQEhNYju41qlvaLZD-zmH-BfNkgszDOfFaEL'*/}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return{
                ...state, 
                user: action.user
            }
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
        case "SET_PLAYLISTS":
            return{
                ...state, 
                playlists: action.playlists
            }
        case "SET_PLAYLIST_ID":
            return {
                ...state,
                playlistId: action.playlistId,
            };
        case "SET_ITEM":
            return{
                ...state,
                item: action.item,
            }
        case "SET_ARTIST":
            return{
                ...state,
                artistId: action.artistId,
            }
        case "SET_PLAYING_ARTIST_ID":
            return{
                ...state,
                playingArtistId: action.playingArtistId,
            }
        case "SET_PLAYING_PLAYLIST_ID":
            return{
                ...state,
                playingPlaylistId: action.playingPlaylistId,
            }
        default:
            return state;
    }
}
export default reducer;