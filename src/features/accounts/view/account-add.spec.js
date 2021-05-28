import { accounts } from '../../../../tests/fixtures';
import { NameInvalidError, NameNonUniqueError } from '../body';
import { setAccountCommand } from './set-account';

describe('add account use case', () => {
  let accountsService, authService;

  beforeAll(() => {
    const set = jest.fn(account => accountsService.items.push(account));
    accountsService = {
      items: [],
      activeItems () { return this.items; },
      set
    };

    authService = {
      userId: () => '4271ef61-2cf9-4729-a4db-4d0067c737cf'
    };
  });

  test('add account to repository with correct data shape', async () => {
    const accountData = { name: 'new account' };

    await setAccountCommand(accountsService, authService, accountData);

    expect(accountsService.set)
      .toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(String),
        user: authService.userId(),
        name: accountData.name
      }));
  });

  test('throws if empty account name', async () => {
    const accountData = { name: '' };

    await expect(setAccountCommand(accountsService, authService, accountData))
      .rejects
      .toThrow(NameInvalidError);
  });

  test('throws if account name already exists', async () => {
    const name = accounts[0].name;
    const accountData = { name };

    await setAccountCommand(accountsService, authService, accountData);

    await expect(setAccountCommand(accountsService, authService, accountData))
      .rejects
      .toThrow(NameNonUniqueError);
  });
});
