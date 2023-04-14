import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Form from '../components/Form';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    nameInput: '',
    emailInput: '',
    descriptionInput: '',
    imageInput: '',
    disableButton: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      nameInput: name,
      emailInput: email,
      descriptionInput: description,
      imageInput: image,
      loading: false,
      redirect: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  handleClick = async (event) => {
    event.preventDefault();
    const {
      nameInput,
      emailInput,
      descriptionInput,
      imageInput } = this.state;

    const user = {
      name: nameInput,
      email: emailInput,
      description: descriptionInput,
      image: imageInput,
    };
    this.setState({
      loading: true,
    });
    await updateUser(user);
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  validateForm = () => {
    const {
      nameInput,
      emailInput,
      descriptionInput,
      imageInput } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const errors = [
      !nameInput.length,
      !emailRegex.test(emailInput),
      !descriptionInput.length,
      !imageInput.length,
    ];
    const isValid = errors.every((error) => !error);
    this.setState({
      disableButton: !isValid,
    });
  };

  render() {
    const {
      loading,
      nameInput,
      emailInput,
      descriptionInput,
      imageInput,
      disableButton,
      redirect } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          { loading ? <Loading /> : (
            <Form
              nameInput={ nameInput }
              emailInput={ emailInput }
              descriptionInput={ descriptionInput }
              imageInput={ imageInput }
              handleChange={ this.handleChange }
              handleClick={ this.handleClick }
              disableButton={ disableButton }
            />
          )}
          {redirect ? <Redirect to="/profile" /> : null}
        </div>
      </>
    );
  }
}
