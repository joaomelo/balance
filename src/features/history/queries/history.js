import { select } from "../../../libs/stream";
import { projectHistory } from "../body";

export function createHistoryQuery(groupsSelector, accountsSelector) {
  return select([groupsSelector, accountsSelector], (values) =>
    projectHistory(...values)
  );
}
