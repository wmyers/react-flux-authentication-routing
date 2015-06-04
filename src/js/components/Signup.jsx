import React from 'react/addons';
import ReactMixin from 'react-mixin';
import LoginActionCreators from '../actions/LoginActionCreators';

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      extra: ''
    };
  }

  signup(e) {
    e.preventDefault();
    LoginActionCreators.signup(this.state.user, this.state.password, this.state.extra)
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Signup</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="extra">Extra</label>
          <input type="text" valueLink={this.linkState('extra')} className="form-control" id="password" ref="password" placeholder="Some extra information" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
