import { initFirebase } from "../tests/firebase/init.js";
import { streamQuery } from "./query.js";

describe("firestore base streams", () => {
  let fb;

  beforeEach(async () => {
    fb = await initFirebase();
  });
  afterAll(() => fb && fb.free());

  it("streams initialize with correct data", async () => {
    const { indexedStream, listStream } = streamQuery(fb.onSnapshot);
    expect(indexedStream.current).toMatchObject({});
    expect(Array.isArray(listStream.current)).toBeTruthy();
    expect(listStream.current).toHaveLength(0);
  });

  const id = "test-id";
  const meta = "test meta";
  const item = { id, meta };

  it("indexed query reacts to query updates", async () => {
    const { indexedStream } = streamQuery(fb.onSnapshot);

    await fb.setItem(item);

    expect(indexedStream.current).toMatchObject({ [id]: item });
  });

  it("list query reacts to query updates", async () => {
    const { listStream } = streamQuery(fb.onSnapshot);

    await fb.setItem(item);

    expect(listStream.current).toEqual(
      expect.arrayContaining([expect.objectContaining(item)])
    );
  });

  it("snapshot is unsubscribed on stream completion", async () => {
    const { indexedStream } = streamQuery(fb.onSnapshot);
    const onCloseSpy = jest.spyOn(indexedStream, "onClose");

    const observer = jest.fn();
    indexedStream.subscribe(observer);

    indexedStream.close();

    await fb.setItem(item);

    expect(onCloseSpy).toHaveBeenCalled();
    expect(observer).toHaveBeenCalledTimes(1);
  });
});
