import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const {
      handleChange,
      handleClick,
      nameInput,
      emailInput,
      descriptionInput,
      imageInput,
      disableButton } = this.props;
    return (
      <form>
        <h1>Editar perfil</h1>
        <input
          name="nameInput"
          type="text"
          data-testid="edit-input-name"
          onChange={ handleChange }
          value={ nameInput }
        />
        <input
          name="emailInput"
          type="email"
          data-testid="edit-input-email"
          onChange={ handleChange }
          value={ emailInput }
        />
        <input
          name="descriptionInput"
          type="text"
          data-testid="edit-input-description"
          onChange={ handleChange }
          value={ descriptionInput }
        />
        <input
          name="imageInput"
          type="text"
          data-testid="edit-input-image"
          onChange={ handleChange }
          value={ imageInput }
        />
        <button
          data-testid="edit-button-save"
          disabled={ disableButton }
          onClick={ handleClick }
        >
          Salvar

        </button>
      </form>
    );
  }
}

Form.propTypes = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  disableButton: PropTypes.bool,
  nameInput: PropTypes.string,
  emailInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  imageInput: PropTypes.string,
}.isRequired;
