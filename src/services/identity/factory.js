import { streamAuth } from "@joaomelo/stream-fire";
import { createSignIn } from "./sign-in";

export function createIdentityService(fireauth) {
  return {
    ...streamAuth(fireauth.onAuthStateChanged),
    signIn: createSignIn(fireauth),
    signOut: () => fireauth.signOut(),
  };
}
