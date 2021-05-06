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

  test('repository spec has the expected shape', () => {
    expect(testRepository).toEqual(expect.objectContaining({
      state: expect.any(Object),
      itemById: expect.any(Function),
      allItems: expect.any(Function),
      activeItems: expect.any(Function),
      set: expect.any(Function),
      del: expect.any(Function),
      igniteQuery: expect.any(Function)
    }));
  });

  test('repository service can set values', async () => {
    const item = { id: 'test-id', name: 'test name' };
    await testRepository.set(item);

    const doc = await firestore.doc('test/test-id').get();
    const record = doc.data();
    expect(record).toEqual(expect.objectContaining(item));
  });

  test('repository service can logically delete values', async () => {
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
});
