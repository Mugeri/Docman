import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { purple500 } from 'material-ui/styles/colors';
import { RaisedButton } from 'material-ui';
import request from 'superagent';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';
import styles from '../../../shared/styles/styles.css';
import * as authActions from '../../../actions/authActions';
import * as displayActions from '../../../actions/displayActions';
import Login from '../Authentication/Login.jsx';

const style = {
  backgroundImage: 'url(' + bgimage + ')',
  title: {
    cursor: 'pointer',
  },
  button: {
    primaryColor: purple500,
  },
  palette: {
    primary1Color: purple500,
  },
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      open: false,
      register: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.errorSet('');
  };
  handleRegister = () => {
    this.setState({ register: true });
  }
  handleRegisterClose = () => {
    this.setState({ register: false });
  }
  handleSubmit = () => {
    request
      .post('/api/users/login')
      .send({
        userName: this.state.username,
        password: this.state.password,
      })
      .end((err, res) => {
        if (res.status === 202) {
          this.setState({ open: false });
          const token = res.body.token;
          const permissions = res.body.permissions;
          const username = res.body.username;
          this.props.setPermission(permissions);
          window.localStorage.setItem('permissions', permissions);
          window.localStorage.setItem('username', username)
          window.localStorage.setItem('token', token);
          this.props.reloadPage(1);
          browserHistory.push('/dashboard');
        } else {
          const error = JSON.parse(res.text);
          this.props.errorSet(error.message);
        }
      });
  }

  render() {
    return (
      <div className={styles.main} style={style} >
          <div className={styles.color_}>
            <RaisedButton
              secondary
              label="login"
              onTouchTap={this.handleOpen}
              className={styles.buttonHome}
            />

            <Login
              open={this.state.open}
              handleClose={this.handleClose}
              handleSubmit={this.handleSubmit}
              handlePassword={this.handlePassword}
              handleUsername={this.handleUsername}
              username={this.state.username}
              password={this.state.password}
              error={this.props.error}
            />

            <h1> DOCMAN </h1>
            <p> Out with the old in with the new.</p>
            <p>Track files through the whole organization</p>
          </div>

      </div>

  );
  }
}
function mapStateToProps(state) {
  return {
    error: state.auth.message,
  };
}

export default connect(
  mapStateToProps,
  Object.assign({}, displayActions, authActions)
  )(Home);
