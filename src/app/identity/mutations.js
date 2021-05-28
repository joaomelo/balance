import { createSignIn } from './sign-in';

export function createIdentityMutations (fireauth) {
  return {
    signIn: createSignIn(fireauth),
    signOut: () => fireauth.signOut()
  };
}
