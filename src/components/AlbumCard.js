import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { album: {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100 } } = this.props;
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

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};
