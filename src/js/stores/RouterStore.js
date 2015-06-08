import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';


class RouterStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._nextRouterPath = null;
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.ROUTER_NEXT_TRANSITION_PATH:
        this._nextRouterPath = action.path;
        break;

      default:
        break;
    };
  }

  //any value can only be retrieved once
  get nextTransitionPath() {
    let nextPath = this._nextRouterPath;
    this._nextRouterPath = null;
    return nextPath;
  }
}

export default new RouterStore();
