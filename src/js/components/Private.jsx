import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'

export default AuthenticatedComponent(class Private extends React.Component {
  render() {
    return (
      <div>
        <h1> {this.props.user ? this.props.user.username + '\'s private stuff' : ''}</h1>
        <p>blah blah</p>
      </div>
    );
  }
});
