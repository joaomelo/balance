import { credentials } from "../../../tests/fixtures";
import { initFirebaseSuiteFromEnv } from "../firebase";
import { userStream, selectUserId, createIdentityService } from "../identity";
import { createSet } from "./set";
import { queryRepoWithUser } from "./query-user";

describe("query with user awareness", () => {
  let app, itemsQuery, set, userIdStream, signIn;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    const fireauth = suite.fireauth;
    app = suite.app;

    const collection = suite.firestore.collection("test");
    set = createSet(collection);

    userIdStream = selectUserId(userStream(fireauth));
    const driver = collection.where("id", "==", "test-id");
    itemsQuery = queryRepoWithUser(userIdStream, driver);

    const identityService = createIdentityService(fireauth);
    signIn = () => identityService.signIn(credentials[0]);
  });

  afterAll(() => app.delete());

  it("query is always empty while no user is signed in", async () => {
    const item = { id: "test-id", name: "test name" };
    await set(item);

    expect(itemsQuery.current).toMatchObject({});
  });

  it("query shows user data after sign in", async () => {
    await signIn();

    const item = {
      id: "test-id",
      name: "test name",
      user: userIdStream.current,
    };
    await set(item);

    expect(itemsQuery.current).toMatchObject({ [item.id]: item });
  });
});
