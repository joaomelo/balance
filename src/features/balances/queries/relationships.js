import { select } from '../../../app/query';
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
