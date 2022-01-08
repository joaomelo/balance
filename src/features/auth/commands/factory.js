import { createSignIn } from "./sign-in";
import { createSignOut } from "./sign-out";
import { createCreateUser } from "./create";

export function createAuthCommands(dependencies) {
  return {
    signIn: createSignIn(dependencies),
    signOut: createSignOut(dependencies),
    createUser: createCreateUser(dependencies),
  };
}
