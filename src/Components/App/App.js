import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      searchResults: [{
        id: "Blah",
        name: 'Test1',
        artist: 'Spencer',
        album: 'World'
      },
      {
        id: "Two",
        name: "Test2",
        artist: "Bobby",
        album: "Let's do it"
      }],
      playlistTracks: [{
        id: "Blah",
        name: 'Test1',
        artist: 'Spencer',
        album: 'World'
      }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(track)
      });
    }
  }

  removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      });
  }

  render() {
    console.log(this.state.playlistTracks);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          < SearchBar />
          <div className="App-playlist">
            < SearchResults playlistTracks={this.state.searchResults} onAdd={this.addTrack}/>
            < Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
