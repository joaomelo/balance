import { accounts } from '../../../../tests/fixtures';
import { NameInvalidError, NameNonUniqueError } from '../body';
import { setAccount } from './add';

describe('add account use case', () => {
  const accountsService = {
    add: jest.fn()
  };

  const identityService = {
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
    accountsService,
    identityService,
    accountsStore
  };

  test('add account to repository with correct data shape', async () => {
    const accountData = { name: 'new account' };

    await setAccount(accountData, dependencies);

    expect(accountsService.set)
      .toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(String),
        user: identityService.getters.userId,
        name: accountData.name
      }));
  });

  test('throws if empty account name', async () => {
    const accountData = { name: '' };

    await expect(setAccount(accountData, dependencies))
      .rejects
      .toThrow(NameInvalidError);
  });

  test('throws if account name already exists', async () => {
    const name = accounts[0].name;
    const accountData = { name };

    await expect(setAccount(accountData, dependencies))
      .rejects
      .toThrow(NameNonUniqueError);
  });
});
