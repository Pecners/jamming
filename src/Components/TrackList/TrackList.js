import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {


  render() {
    return(
      <div className="TrackList">
        {this.props.trackList.map(track => (
          < Track key={track.id} result={track} onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}/>
        ))}
      </div>
    );
  }
}

export default TrackList;
