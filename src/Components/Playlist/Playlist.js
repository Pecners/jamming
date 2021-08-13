import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
      this.props.onNameChange(e.target.value)
  }

  render() {
    return(
      <div className="Playlist" onChange={this.handleNameChange}>
        <input defaultValue={'New Playlist'}/>
        < TrackList trackList={this.props.trackList} isRemoval='true'
        onRemove={this.props.onRemove}/>
        <button className="Playlist-save" onClick={this.props.OnSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
