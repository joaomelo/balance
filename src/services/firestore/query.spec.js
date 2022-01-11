import { initFirebase } from "../tests/firebase/init.js";
import { streamUser } from "./auth.js";
import { streamReactiveQuery } from "./query.js";

describe("firestore base streams", () => {
  let fb;

  beforeEach(async () => {
    fb = await initFirebase();
  });
  afterAll(() => fb && fb.free());

  const idOne = "test-id";
  const itemOne = { id: idOne, meta: "one" };

  it("stream holds initial state when observable pushes falsy values", async () => {
    const { userIdStream } = streamUser(fb.onAuthStateChanged);
    const { listStream } = streamReactiveQuery(
      userIdStream,
      fb.createOnSnapshot
    );

    await fb.setItem(itemOne);

    expect(listStream.current).toHaveLength(0);
  });

  const idTwo = "another-test-id";
  const itemTwo = { id: idTwo, meta: "two" };

  it("query reflects observable updates", async () => {
    const { userIdStream } = streamUser(fb.onAuthStateChanged);
    const { listStream, indexedStream } = streamReactiveQuery(
      userIdStream,
      fb.createOnSnapshot
    );

    await fb.signUp();

    await fb.setItem(itemOne);
    await fb.setItem({ ...itemTwo, user: userIdStream.current });

    expect(listStream.current).toHaveLength(1);
    expect(indexedStream.current).toMatchObject({ [idTwo]: itemTwo });
  });
});
