import React from 'react';
import './Tracks.css';

class Track extends React.Component{
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    return(
      <div className="tracks" id={this.props.track.id}>
        <div className="info">
          <h4>{this.props.track.name}</h4>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <div className="action">
          {this.props.isRemoval ? (
            <a onClick={this.removeTrack}>-</a>
          ) : (
            <a onClick={this.addTrack}>+</a>
          )}
        </div>
      </div>
    );
  }
}

export default Track
