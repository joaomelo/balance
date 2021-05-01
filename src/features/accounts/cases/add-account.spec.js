import { accounts } from '../../../../tests/fixtures';
import { NameInvalidError, NameNonUniqueError } from '../body';
import { addAccountCase } from './add';

describe('add account use case', () => {
  const accountsRepository = {
    add: jest.fn()
  };

  const authStore = {
    getters: {
      userId: '4271ef61-2cf9-4729-a4db-4d0067c737cf'
    }
  };

  const accountsStore = {
    getters: {
      allItems: accounts
    }
  };

  const dependencies = {
    accountsRepository,
    authStore,
    accountsStore
  };

  test('add account to repository with correct data shape', async () => {
    const accountData = { name: 'new account' };

    await addAccountCase(accountData, dependencies);

    expect(accountsRepository.add)
      .toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(String),
        user: authStore.getters.userId,
        name: accountData.name
      }));
  });

  test('throws if empty account name', async () => {
    const accountData = { name: '' };

    await expect(addAccountCase(accountData, dependencies))
      .rejects
      .toThrow(NameInvalidError);
  });

  test('throws if account name already exists', async () => {
    const name = accounts[0].name;
    const accountData = { name };

    await expect(addAccountCase(accountData, dependencies))
      .rejects
      .toThrow(NameNonUniqueError);
  });
});
