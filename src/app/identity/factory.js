import { createService } from '../service';
import { subscribe } from './subscribe';
import { signIn } from './sign-in';

export async function createIdentityService (fireauth) {
  const state = {
    user: null
  };

  const selectors = {
    isSignedIn: ({ state }) => !!state.user,
    user: ({ state }) => ({ ...state.user }),
    userId: ({ state }) => state.user.id
  };

  const actions = {
    signIn: credentials => signIn(fireauth, credentials)
  };

  const identityService = createService({ state, selectors, actions });

  const updateUser = user => identityService.update({ user });
  subscribe(fireauth, updateUser);

  return identityService;
}
