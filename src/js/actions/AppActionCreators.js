import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  notifyAppMounted: () => {
    dispatch(ActionTypes.APP_CONTROLLER_COMPONENT_MOUNTED);
  },

  notifyAppUnmounted: () => {
    dispatch(ActionTypes.APP_CONTROLLER_COMPONENT_UNMOUNTED);
  },

  storeRouterTransitionPath: (path) => {
    dispatch(ActionTypes.APP_NEXT_ROUTER_TRANSITION_PATH, {path});
  }
}
