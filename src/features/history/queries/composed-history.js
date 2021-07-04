import { select } from '../../../app/query';
import { projectHistory } from '../body';

export function selectComposedHistory (
  groupsSelector,
  accountsSelector
) {
  return select(
    [
      groupsSelector,
      accountsSelector
    ],
    values => projectHistory(...values)
  );
}
