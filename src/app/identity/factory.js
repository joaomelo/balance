import { createService } from '../service';
import { subscribe } from './subscribe';
import { signIn } from './sign-in';

export async function createIdentityService (fireauth, service = {}) {
  const state = {
    user: null,
    ...service.state
  };

  const selectors = {
    isSignedIn: ({ state }) => !!state.user,
    user: ({ state }) => ({ ...state.user }),
    userId: ({ state }) => state.user.id,
    ...service.selectors
  };

  const actions = {
    signIn: credentials => signIn(fireauth, credentials),
    ...service.actions
  };

  const identityService = createService({ state, selectors, actions });

  const updateUser = user => identityService.update({ user });
  subscribe(fireauth, updateUser);

  return identityService;
}
