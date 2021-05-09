import { balances } from '../../../../tests/fixtures';
import { delAccountCase } from './del-account';

describe('del account use case', () => {
  let accountsService, balancesService;

  beforeAll(() => {
    accountsService = {
      del: jest.fn()
    };
    balancesService = {
      accountBalances: (accountId) => balances.filter(b => b.accountId === accountId),
      delBalancesCase: jest.fn()
    };
  });

  test('call del actions on both accounts and balances services', async () => {
    const accountId = '8a502ea4-2532-409a-8082-d4e88aaadd03';
    const balancesIds = ['82362731-b916-4e4f-b810-fb6bdee8b825', '137ce1a3-592e-4979-b47c-27ad796e5dce'];

    await delAccountCase(accountsService, balancesService, accountId);

    expect(accountsService.del).toHaveBeenCalledWith(accountId);
    expect(balancesService.delBalancesCase).toHaveBeenCalledWith(balancesIds);
  });
});
