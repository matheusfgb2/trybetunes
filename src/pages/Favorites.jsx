import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

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
    const { loading, favoriteSongs } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {
            loading ? <Loading /> : (
              <div>
                {favoriteSongs.map((music) => (
                  <MusicCard
                    key={ Math.random() }
                    music={ music }
                    dodelete
                  />
                ))}
              </div>
            )
          }

        </div>
      </>
    );
  }
}
