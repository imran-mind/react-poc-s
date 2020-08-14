
// const cliendSecret='339ab5e8d9c8410b8b7786519d2cd351';

export const authEndpoint="https://accounts.spotify.com/authorize";

// const redirectUri = "http://localhost:3000/";

const redirectUri = "https://spotify-clone-12fd3.web.app/";

const cliendId='292e432d261c467eada43c7cec2e4587';

const scopes =[
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
]


export const getTokenFromUrl = ()=>{
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item)=>{
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        },{})
}
export const loginUrl = `${authEndpoint}?client_id=${cliendId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`