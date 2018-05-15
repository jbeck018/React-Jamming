import React from 'react';
import './Results.css';
import Tracklist from '../Tracklist/Tracklist.js';

class Results extends React.Component{
  render() {
    return(
      <div className="centered">
        <h3>Search Results</h3>
        <div className="objectBox">
          <Tracklist
            tracks={this.props.tracks}
            onAdd = {this.props.onAdd}
            isRemoval = {false}
          />
        </div>
      </div>
    );
  }
}

export default Results;
