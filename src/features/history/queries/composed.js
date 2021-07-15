import { select } from '../../../libs/query';
import { projectComposedHistory } from '../body';

export function selectComposedHistory (
  groupsSelector,
  accountsSelector
) {
  return select(
    [
      groupsSelector,
      accountsSelector
    ],
    values => projectComposedHistory(...values)
  );
}
