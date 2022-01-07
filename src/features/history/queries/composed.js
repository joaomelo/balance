import { select } from "../../../libs/stream";
import { projectComposedHistory } from "../body";

export function selectComposedHistory(groupsSelector, accountsSelector) {
  return select([groupsSelector, accountsSelector], (values) =>
    projectComposedHistory(...values)
  );
}
