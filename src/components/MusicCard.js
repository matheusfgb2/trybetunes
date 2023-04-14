import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
    songDeleted: false,
  };

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

  handleChangeFavorite = async ({ target }) => {
    const { id } = target;
    const { favoriteSongs } = this.state;
    const { music, dodelete } = this.props;
    this.setState({
      loading: true,
    });

    if (favoriteSongs.every(({ trackId }) => trackId !== Number(id))) {
      await addSong(music);
      this.setState({
        songDeleted: false,
      });
    } else {
      await removeSong(music);
      this.setState({
        songDeleted: dodelete,
      });
    }
    this.fetchGetFavoriteSongs();
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
    const { loading, favoriteSongs, songDeleted } = this.state;
    const { music } = this.props;
    const { trackId, trackName, previewUrl } = music;
    if (!trackName || songDeleted) return;
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
                  onChange={ this.handleChangeFavorite }
                  checked={ favoriteSongs.some((song) => song.trackId === trackId) }
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
  dodelete: PropTypes.bool,
};

MusicCard.defaultProps = {
  dodelete: false,
};
