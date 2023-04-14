import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

  handleFavorite = async () => {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState((prevState) => ({
      loading: false,
      checked: !prevState.checked,
    }));
  };

  fetchGetFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const favSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favSongs,
    });
  };

  render() {
    const { loading, checked, favoriteSongs } = this.state;
    const { music } = this.props;
    const { trackId, trackName, previewUrl } = music;
    if (!trackName) return;
    return (
      <li>
        { loading ? <Loading />
          : (
            <>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
                <input
                  type="checkbox"
                  id={ trackId }
                  onChange={ this.handleFavorite }
                  checked={ checked || favoriteSongs
                    .some((song) => song.trackId === trackId) }
                />
                Favorita
              </label>
            </>
          )}
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
