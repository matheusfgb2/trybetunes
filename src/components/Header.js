import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
    });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        {loading ? <Loading /> : <p data-testid="header-user-name">{userName}</p> }
      </header>
    );
  }
}
