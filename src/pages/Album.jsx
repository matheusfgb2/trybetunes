import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    didFetch: false,
    musics: [],
  };

  componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      didFetch: true,
      musics: await getMusics(id),
    });
  };

  render() {
    const { musics, didFetch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {
            didFetch ? (
              <>
                <h4 data-testid="album-name">{musics[0].collectionName}</h4>
                <p data-testid="artist-name">{musics[0].artistName}</p>
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                {musics.map((music) => (<MusicCard
                  key={ Math.random() }
                  music={ music }
                />))}
              </>
            ) : null
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
