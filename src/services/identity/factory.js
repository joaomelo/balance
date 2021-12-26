import { streamAuth } from "@joaomelo/stream-fire";
import { signIn } from "./sign-in";

export function createIdentityService(fireauth) {
  return {
    ...streamAuth(fireauth.onAuthStateChanged),
    signIn: (credentials) => signIn(fireauth, credentials),
    signOut: () => fireauth.signOut(),
  };
}
