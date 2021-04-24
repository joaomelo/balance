import { initFirebaseSuiteFromEnv } from '../firebase';
import { createRepositoryProvider } from './factory';

describe('firestore repository provider factory', () => {
  const config = {
    ...initFirebaseSuiteFromEnv(),
    firestoreEmulatorHost: process.env.FIRESTORE_EMULATOR_HOST
  };

  let repositoryProvider;

  beforeEach(async () => {
    repositoryProvider = await createRepositoryProvider(config);
  });

  test('correctly instantiate firestore repository', async () => {
    expect(repositoryProvider).toHaveProperty('repository');
  });

  test('connect to emulator and clear data', async () => {
    const repository = repositoryProvider.repository('dummy');

    await repository.add([{
      id: 'dummy-key',
      dummyData: 'dummyData'
    }]);

    repositoryProvider = await createRepositoryProvider(config);

    const items = await repositoryProvider
      .repository('dummy')
      .query();

    expect(items).toHaveLength(0);
  });
});
