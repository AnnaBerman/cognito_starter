import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
  logoutHandler = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.authenticateUser(false);
      this.props.auth.setAuthUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuth && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              <div className="auth-buttons">
                {!this.props.auth.isAuth && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuth && (
                  <a
                    href="/"
                    className="button is-light"
                    onClick={this.logoutHandler}
                  >
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
