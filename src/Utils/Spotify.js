const clientId = '91c6fa86b8194f899bba254e2f38b365';
const redirectURI = 'http://localhost:3000/';
const authURL = 'https://accounts.spotify.com/authorize?client_id='+clientId+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirectURI;


let accessToken = '';
let expiresIn = '';

const Spotify = {

  getAccessToken() {
    if (accessToken !== ''){
      return accessToken;
    }else{
      if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){
        accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }else{
        window.location = authURL;
      }
    }
  },

  search(term) {
    return fetch('https://api.spotify.com/v1/search?type=track&q='+term, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Network error');
    }).then(jsonResponse => {
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    }else{
      return [];
    }
    })
  },

  savePlaylist(playlistName, trackURIs) {
    let userID = '';
    let playlistID = '';
    let addTracksURL = '';
    let createPlaylistURL = '';

    if (playlistName && trackURIs){
      return fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => {
        if(response.ok) {
          return response.json();
        }
      }).then(jsonResponse => {
        userID = jsonResponse.id;
        createPlaylistURL = 'https://api.spotify.com/v1/users/'+userID+'/playlists';
        return fetch(createPlaylistURL, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          if(response.ok) {
            return response.json();
          }
        }).then(jsonResponse => {
          playlistID = jsonResponse.id;
          addTracksURL = 'https://api.spotify.com/v1/users/'+userID+'/playlists/'+playlistID+'/tracks';
          return fetch(addTracksURL, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
          }).then(jsonResponse => {
            playlistID = jsonResponse.id;
          });
        })
      })
    }
  },

}

export default Spotify
