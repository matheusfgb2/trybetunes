import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <Header isProfilePage />
        <div data-testid="page-profile">
          { loading ? <Loading /> : (
            <>
              <p>{`Nome: ${user.name}`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Descrição: ${user.description}`}</p>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <br />
              <Link to="/profile/edit">Editar perfil</Link>
            </>
          )}
        </div>
      </>
    );
  }
}
