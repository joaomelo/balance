import { createSignIn } from './sign-in';

export function createMutations (fireauth) {
  return {
    signIn: createSignIn(fireauth),
    signOut: () => fireauth.signOut()
  };
}
