import { store } from '../../../app/store';

export function createAuthStore (identityProvider) {
  const state = {
    user: null
  };

  const getters = {
    get isSignedIn () {
      return !!state.user;
    },
    get user () {
      return { ...state.user };
    },
    get userId () {
      return state.user.id;
    }
  };

  const identityService = store({ state, getters });

  identityProvider.subscribe(user => {
    state.user = user;
    identityService.invalidate();
  });

  return identityService;
}
