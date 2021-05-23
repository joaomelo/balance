import { createSignIn } from './sign-in';

export function createCommands (fireauth) {
  return {
    signIn: createSignIn(fireauth),
    signOut: () => fireauth.signOut()
  };
}
