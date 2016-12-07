import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import store from '../store';
import { fetchAlbumsFromServer, fetchAlbumFromServer } from '../action-creators/albums.js';
import { fetchArtistsFromServer, fetchArtistFromServer } from '../action-creators/artists.js';
import { selectPlaylist, selectPlaylists } from '../action-creators/playlists.js';
import { loadSongs } from '../action-creators/songs.js';
import { play, pause, load, startSong, toggle, toggleOne, next, prev } from '../action-creators/player.js';

import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = Object.assign(
      initialState,
      store.getState(),
      store.getState().albumsState,
      store.getState().artistsState,
      store.getState().playlistsState,
      store.getState().songsState
    );

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount () {

    store.dispatch(fetchAlbumsFromServer());
    store.dispatch(fetchArtistsFromServer());
    store.dispatch(selectPlaylists());

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));

    this.unsubscribe = store.subscribe(() => {
      this.setState(Object.assign(
      initialState,
      store.getState(),
      store.getState().albumsState,
      store.getState().artistsState,
      store.getState().playlistsState,
      store.getState().songsState
    ));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  play () {
   store.dispatch(play());
  }

  pause () {
    store.dispatch(pause());
  }

  load (currentSong, currentSongList) {
    store.dispatch(load(currentSong, currentSongList));
  }

  startSong (song, list) {
   store.dispatch(startSong(song, list));
  }

  toggleOne (selectedSong, selectedSongList) {
    store.dispatch(toggleOne(selectedSong, selectedSongList));
  }

  toggle () {
    store.dispatch(toggle());
  }

  next () {
    store.dispatch(next());
  }

  prev () {
    store.dispatch(prev());
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
   store.dispatch(fetchAlbumFromServer(albumId));
  }

  selectArtist (artistId) {
    store.dispatch(fetchArtistFromServer(artistId));
  }

  addPlaylist (playlistName) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        }, () => {
          hashHistory.push(`/playlists/${playlist.id}`)
        });
      });
  }

  selectPlaylist (playlistId) {
    store.dispatch(selectPlaylist(playlistId));
  }

  loadSongs (songs) {
    store.dispatch(loadSongs(songs));
  }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = this.state.selectedPlaylist;
        const songs = this.state.selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });

        this.setState({
          selectedPlaylist: newSelectedPlaylist
        });
      });
  }

  render () {

    const props = Object.assign({}, this.state, {
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      selectAlbum: this.selectAlbum,
      selectArtist: this.selectArtist,
      addPlaylist: this.addPlaylist,
      selectPlaylist: this.selectPlaylist,
      loadSongs: this.loadSongs,
      addSongToPlaylist: this.addSongToPlaylist
    });

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={this.state.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.player.currentSong}
          currentSongList={this.state.player.currentSongList}
          isPlaying={this.state.player.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
