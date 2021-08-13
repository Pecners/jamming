const clientId = '20a5e630692d49e3983f2a02c144bef7';
const redirectUri = 'http://localhost:3000/';
const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let userToken = undefined;
let expiresIn = undefined;

const Spotify = {
  getAccessToken() {
    if (userToken) {
      return userToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      userToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];

      window.setTimeout(() => userToken = '', expiresIn * 1000);
    } else {
      window.location = spotifyUri;
    }
  },

    search(searchTerm) {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {Authorization: `Bearer ${userToken}`}
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
    }


}


export default Spotify;
