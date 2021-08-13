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
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        /* .push() method doesn't work to add to array because it returns the length
        of the new array. .concat() returns the whole new array.
        This bug took me HOURS to figure out.*/
        playlistTracks: this.state.playlistTracks.concat(track)
      });
    }
  }

  search(term) {
    console.log('New Search: ' + term);
  }

  removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      });
  }

  render() {
    console.log('Playlist Name: ' + this.state.playlistName);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          < SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            < SearchResults trackList={this.state.searchResults} onAdd={this.addTrack}/>
            < Playlist playlistName={this.state.playlistName}
            trackList={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onClick={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
