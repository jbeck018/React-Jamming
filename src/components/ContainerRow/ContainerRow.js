import React from 'react';
import Results from '../Results/Results.js';
import Playlist from '../Playlist/Playlist.js';
import './ContainerRow.css';

class ContainerRow extends React.Component {
 render(){
    return (
        <div className='row'>
            <Results
              tracks = {this.props.searchResults}
              onAdd = {this.props.onAdd}
            />
            <Playlist
              playlistName = {this.props.playlistName}
              playlistTracks = {this.props.playlistTracks}
              onRemove = {this.props.onRemove}
              onNameChange = {this.props.onNameChange}
            />
        </div>
    );
    }
 }

export default ContainerRow;
