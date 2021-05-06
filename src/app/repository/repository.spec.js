import { initFirebaseSuiteFromEnv } from '../firebase';
import { createRepositoryServiceFactory } from './factory';

describe('repository service module', () => {
  let firestore, testRepository;

  beforeAll(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    firestore = suite.firestore;
    const repositoryServiceFactory = createRepositoryServiceFactory(firestore);
    testRepository = repositoryServiceFactory('test');
  });

  test('repository service has the expected shape', () => {
    expect(testRepository).toEqual(expect.objectContaining({
      state: expect.any(Object),
      itemById: expect.any(Function),
      allItems: expect.any(Function),
      activeItems: expect.any(Function),
      set: expect.any(Function),
      del: expect.any(Function),
      igniteQuery: expect.any(Function),
      douseQuery: expect.any(Function)
    }));
  });

  test('can set values', async () => {
    const item = { id: 'test-id', name: 'test name' };
    await testRepository.set(item);

    const doc = await firestore.doc('test/test-id').get();
    const record = doc.data();
    expect(record).toEqual(expect.objectContaining(item));
  });

  test('can logically delete values', async () => {
    const item = { id: 'test-id', name: 'test name' };

    await testRepository.set(item);
    const docRef = firestore.doc('test/test-id');
    const setDoc = await docRef.get();
    expect(setDoc.data()).toMatchObject({
      _deleted: false
    });

    await testRepository.del('test-id');
    const delDoc = await docRef.get();
    expect(delDoc.data()).toMatchObject({
      _deleted: true
    });
  });

  test('keeps service items updated with collection changes', async () => {
    const spy = jest.spyOn(testRepository, 'update');

    const item = { id: 'test-id', name: 'test name' };
    const newItem = { id: 'test-id', name: 'new name' };
    const filter = () => ({ field: 'id', operator: '==', value: 'test-id' });

    await testRepository.set(item);
    testRepository.igniteQuery([filter]);
    await testRepository.set(newItem);

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      items: expect.objectContaining({
        'test-id': expect.objectContaining(newItem)
      })
    }));
    spy.mockRestore();
  });

  test('querying can be turned off', async () => {
    const spy = jest.spyOn(testRepository, 'update');

    const item = { id: 'test-id', name: 'test name' };
    const newItem = { id: 'test-id', name: 'new name' };
    const filter = () => ({ field: 'id', operator: '==', value: 'test-id' });

    await testRepository.set(item);
    testRepository.igniteQuery([filter]);
    testRepository.douseQuery();
    await testRepository.set(newItem);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
