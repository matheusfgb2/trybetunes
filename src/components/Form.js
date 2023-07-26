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
          placeholder="Nome"
        />
        <input
          name="emailInput"
          type="email"
          data-testid="edit-input-email"
          onChange={ handleChange }
          value={ emailInput }
          placeholder="Email"
        />
        <input
          name="descriptionInput"
          type="text"
          data-testid="edit-input-description"
          onChange={ handleChange }
          value={ descriptionInput }
          placeholder="Descrição"
        />
        <input
          name="imageInput"
          type="text"
          data-testid="edit-input-image"
          onChange={ handleChange }
          value={ imageInput }
          placeholder="URL da imagem"
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
