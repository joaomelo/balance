import { select } from '../../../libs/query';
import { projectBalancesWithRelationships } from '../body';

export function selectBalancesWithRelationships (
  balancesSelector,
  accountsSelector
) {
  return select(
    [
      balancesSelector,
      accountsSelector
    ],
    values => projectBalancesWithRelationships(...values)
  );
}
