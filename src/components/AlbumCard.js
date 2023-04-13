import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { album: {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount } } = this.props;
    return (
      <li>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{artistName}</p>
          <h4>{collectionName}</h4>
        </Link>
      </li>
    );
  }
}
