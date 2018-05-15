import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.js';

class Playlist extends React.Component{
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return(
      <div className="centered playlist">
        <input onChange={this.handleNameChange} placeholder={this.props.playlistName} id='playlistField'/>
        <div className="objectBox">
          <Tracklist
            tracks = {this.props.playlistTracks}
            onRemove = {this.props.onRemove}
            isRemoval = {true}
          />
        </div>
      </div>
    );
  }
}

export default Playlist;
