import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    btnDisabled: true,
    nameInput: '',
    loading: false,
    createdUser: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      btnDisabled: value.length <= 2,
    });
  };

  handleClick = async () => {
    const { nameInput } = this.state;
    const user = {
      name: nameInput,
    };

    this.setState({
      loading: true,
    });
    await createUser(user);
    this.setState({
      createdUser: true,
      loading: false,
    });
  };

  render() {
    const { btnDisabled, nameInput, createdUser, loading } = this.state;
    return (
      <div data-testid="page-login">

        {
          loading ? <Loading /> : (
            <main>
              <input
                name="nameInput"
                type="text"
                placeholder="insira seu nome"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                value={ nameInput }
              />
              <button
                data-testid="login-submit-button"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
              >
                Entrar

              </button>
            </main>
          )
        }
        {createdUser ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}
