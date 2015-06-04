import React from 'react';
import LoginStore from '../stores/LoginStore';
import AppStore from '../stores/AppStore';
import LoginActionCreators from '../actions/LoginActionCreators';
import AppActionCreators from '../actions/AppActionCreators';

/**
 * Exports a higher-order component that connects the component to the LoginStore.
 * This higher-order component is most easily used as an ES7 decorator.
 * Decorators are just a syntax sugar over wrapping class in a function call.
 */
export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {

      if (!LoginStore.isLoggedIn()) {
        console.log('&*&*&* Not logged-in for authenticated page. Next transition path:', transition.path);

        let transitionPath = transition.path;

        //store next path in AppStore for redirecting after authentication
        AppActionCreators.storeRouterTransitionPath(transitionPath);

        //wait until the app controller component is mounted before
        //attempting to auto-login
        let autoLogin = () => LoginActionCreators.autoLoginUser();

        if(AppStore.isMounted()){
          autoLogin();
        }else{
          AppStore.isMountedAsPromise()
          .then(autoLogin);
        }
      }
    }

    constructor() {
      super();
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        jwt={this.state.jwt}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};
