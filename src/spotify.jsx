const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5173/";
const clientId = 'eba5e7f642054f3e9c5d35c28556235f';
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played", 
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];

export const getTokenFronUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce( (initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] =
            decodeURIComponent(parts[1]);

            return initial;
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
