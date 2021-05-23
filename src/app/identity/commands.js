import { createSignIn } from './sign-in';

export function createIdentityCommands (fireauth) {
  return {
    signIn: createSignIn(fireauth),
    signOut: () => fireauth.signOut()
  };
}
