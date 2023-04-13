import React, { Component } from 'react';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    searchArtist: '',
    btnDisabled: true,
    loading: false,
    renderResult: false,
    albums: [],
    notFound: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      btnDisabled: value.length < 2,
    });
  };

  handleClick = async () => {
    this.setState({
      loading: true,
    });

    const { searchArtist } = this.state;
    const result = await searchAlbumsAPI(searchArtist);

    if (result.length) {
      this.setState({
        albums: result,
        renderResult: true,
        loading: false,
        notFound: false,
      });
    } else {
      this.setState({
        loading: false,
        renderResult: false,
        notFound: true,
      });
    }
  };

  render() {
    const { searchArtist,
      btnDisabled,
      albums,
      loading,
      renderResult,
      notFound } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchArtist"
            onChange={ this.handleChange }
            value={ searchArtist }
          />
          <button
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
          { loading ? <Loading /> : null}
          { renderResult ? (
            <section className="result">
              <h1>{`Resultado de álbuns de: ${albums[0].artistName}`}</h1>
              <ul>
                {albums.map((album) => (
                  <AlbumCard key={ album.collectionId } album={ album } />
                ))}
              </ul>
            </section>
          ) : null}
          {notFound ? <p>Nenhum álbum foi encontrado</p> : null}
        </div>
      </>
    );
  }
}
