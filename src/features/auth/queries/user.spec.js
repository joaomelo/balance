import { initFirebase } from "../tests/firebase/init.js";
import { streamUser } from "./auth.js";

describe("auth streams", () => {
  let fb;

  beforeEach(async () => {
    fb = await initFirebase();
  });

  afterAll(() => {
    if (fb) {
      fb.free();
    }
  });

  test("can correctly represent initial state", () => {
    const { userStream, userIdStream, authStatusStream, isSignedInStream } =
      streamUser(fb.onAuthStateChanged);

    expect(authStatusStream.current).toBe("UNSOLVED");
    expect(userIdStream.current).toBeUndefined();
    expect(userStream.current).toBeUndefined();
    expect(isSignedInStream.current).toBeFalsy();
  });

  test("can correctly represent a signed in user", async () => {
    const { userStream, userIdStream, authStatusStream, isSignedInStream } =
      streamUser(fb.onAuthStateChanged);

    await fb.signUp();

    expect(userStream.current).toMatchObject({
      uid: expect.any(String),
      email: expect.any(String),
    });
    expect(userIdStream.current).toEqual(expect.any(String));
    expect(authStatusStream.current).toBe("SIGNED_IN");
    expect(isSignedInStream.current).toBeTruthy();
  });

  test("can correctly represent the sign out state", async () => {
    const { userStream, userIdStream, authStatusStream, isSignedInStream } =
      streamUser(fb.onAuthStateChanged);

    await fb.signUp();
    await fb.signOut();

    expect(userStream.current).toBeNull();
    expect(userIdStream.current).toBeNull();
    expect(authStatusStream.current).toBe("SIGNED_OUT");
    expect(isSignedInStream.current).toBeFalsy();
  });
});
