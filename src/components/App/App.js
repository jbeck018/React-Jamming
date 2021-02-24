import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import ContainerRow from '../ContainerRow/ContainerRow.js';
import Spotify from '../../Utils/Spotify.js';
import LazyLoad from 'react-lazyload';
import bgImage from './concert.jpg';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [],
    }

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.getAccessToken();
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  addTrack(track) {
    let newState = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    newState.push(track);
    this.setState({
      playlistTracks: newState
    });
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({playlistTracks: this.state.playlistTracks.filter(removed => track.id !== removed.id)})
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(e){
    let trackURIs = [];
    for (var uri of this.state.playlistTracks){
      trackURIs.push(uri.uri);
    }
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
      this.setState({
        playlistName: 'Playlist Name',
        playlistTracks: [],
      })
    );
    document.getElementById('playlistField').value = '';
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Jamming</h1>
        </header>
        <SearchBar
          onSearch = {this.search}
          onSave = {this.savePlaylist}
        />
        <ContainerRow
          searchResults = {this.state.searchResults}
          onAdd = {this.addTrack}
          onRemove = {this.removeTrack}
          playlistName = {this.state.playlistName}
          playlistTracks = {this.state.playlistTracks}
          onNameChange = {this.updatePlaylistName}
        />
      </div>
    );
  }
}

export default App;
