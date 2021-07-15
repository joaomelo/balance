import { select } from '../../../libs/query';
import { projectGroupsWithRelationships } from '../body';

export function selectGroupsWithRelationships (
  groupsSelector,
  accountsSelector,
  balancesSelector
) {
  return select(
    [
      groupsSelector,
      accountsSelector,
      balancesSelector
    ],
    values => projectGroupsWithRelationships(...values)
  );
}
