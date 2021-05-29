import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';
import { createDel } from './del';
import { queryRepository } from './query';
import {
  selectAllItems,
  selectActiveItems,
  selectItemById
} from './selectors';

describe('repository query selectors', () => {
  let app, collection, driver, set, del;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    driver = collection.where('id', '==', 'test-id');
    set = createSet(collection);
    del = createDel(collection);
  });

  afterAll(() => app.delete());

  it('selects an array of all items', async () => {
    const items = queryRepository(driver);
    const allItems = selectAllItems(items);
    const item = { id: 'test-id', name: 'test name' };
    await set(item);

    expect(allItems.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(item)
      ])
    );
  });

  it('selects only active items', async () => {
    const items = queryRepository(driver);
    const activeItems = selectActiveItems(items);
    const item = { id: 'test-id', name: 'test name' };
    await set(item);
    await del('test-id');

    expect(activeItems.current).toEqual(
      expect.arrayContaining([])
    );
  });

  it('selects an item by id', async () => {
    const items = queryRepository(driver);
    const itemById = selectItemById(items, 'test-id');
    const item = { id: 'test-id', name: 'test name' };
    await set(item);

    expect(itemById.current).toMatchObject(item);
  });
});
