import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import bluebird from 'bluebird';


class AppStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._mounted = false;
    this._nextRouterPath = null;
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.APP_CONTROLLER_COMPONENT_MOUNTED:
        this._mounted = true;
        break;

      case ActionTypes.APP_CONTROLLER_COMPONENT_UNMOUNTED:
        this._mounted = false;
        break;

      case ActionTypes.APP_NEXT_ROUTER_TRANSITION_PATH:
        this._nextRouterPath = action.path;
        break;

      default:
        break;
    };
  }

  isMounted() {
    return !!this._mounted;
  }

  isMountedAsPromise() {
    //promise to check for 1 second (50 x 20ms intervals) if app is mounted
    return new bluebird((resolve, reject) => {
      let count = 0;
      let intvl = setInterval(() => {
        if(this.isMounted()){
          clearInterval(intvl);
          return resolve(true);
        }
        count++;
        if(count >= 50){
          clearInterval(intvl);
          console.error('App controller component not mounted after waiting 1000 milliseconds');
          return reject(false);
        }
      }, 20)
    })
  }

  //any value can only be retrieved once
  get nextTransitionPath() {
    let nextPath = this._nextRouterPath;
    this._nextRouterPath = null;
    return nextPath;
  }
}

export default new AppStore();
