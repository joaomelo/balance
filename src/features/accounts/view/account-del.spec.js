import { balances } from '../../../../tests/fixtures';
import { delAccountCommand } from './del-account';

describe('del account command', () => {
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
    const balancesIds = balances.filter(b => b.accountId === accountId).map(b => b.id);

    await delAccountCommand(accountsService, balancesService, accountId);

    expect(accountsService.del).toHaveBeenCalledWith(accountId);
    expect(balancesService.delBalancesCase).toHaveBeenCalledWith(balancesIds);
  });
});
