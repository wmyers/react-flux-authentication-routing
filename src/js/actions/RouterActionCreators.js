import { dispatch } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  storeRouterTransitionPath: (path) => {
    dispatch(ActionTypes.ROUTER_NEXT_TRANSITION_PATH, {path});
  }
}
