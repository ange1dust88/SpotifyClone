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