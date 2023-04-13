import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchArtist: '',
    btnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      btnDisabled: value.length < 2,
    });
  };

  render() {
    const { searchArtist, btnDisabled } = this.state;
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
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
