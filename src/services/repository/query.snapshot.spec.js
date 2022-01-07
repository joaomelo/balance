import { initFirebase } from "../tests/firebase/init.js";
import { streamQuery } from "./query.js";

describe("firestore base streams", () => {
  let fb;

  beforeEach(async () => {
    fb = await initFirebase();
  });
  afterAll(() => fb && fb.free());

  const id = "test-id";
  const meta = "test meta";
  const item = { id, meta };

  it("respects an user custom function for data conversion", async () => {
    const convert = (doc) => doc.data().meta;
    const { indexedStream } = streamQuery(fb.onSnapshot, { convert });

    await fb.setItem(item);

    expect(indexedStream.current).toMatchObject({ [id]: meta });
  });

  it("can return the raw doc data without any conversion", async () => {
    const { indexedStream } = streamQuery(fb.onSnapshot);

    await fb.setItem(item);

    expect(indexedStream.current).toMatchObject({ [id]: item });
  });
});
