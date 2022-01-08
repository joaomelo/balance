import { createSignIn } from "./sign-in";
import { createSignOut } from "./sign-out";

export function createAuthCommands(dependencies) {
  return {
    signIn: createSignIn(dependencies),
    signOut: createSignOut(dependencies),
  };
}
