const clientId = '20a5e630692d49e3983f2a02c144bef7';
const redirectUri = 'http://pecjams.surge.sh';
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
    console.log(`Search Term: ${searchTerm}`);
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
  },

  savePlaylist(playlistName, trackUris) {
    if (!(playlistName && trackUris)) {
      return;
    }
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${userToken}`
    };
    let userId = undefined;
    let playlistId = undefined;
    fetch(userUrl, {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => userId = jsonResponse.id)
      .then(() => {
        const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: playlistName
          })
        })
      })
      .then(response => response.json())
      .then(jsonResponse => playlistId = jsonResponse.id)
      .then(() => {
        const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        fetch(addPlaylistTracksUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackUris
          })
        });
      })
  }
}


export default Spotify;
