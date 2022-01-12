import { createUuid } from "../../../libs/helpers";
import { validateGroup } from "../body";

export function createSetGroup(dependencies) {
  const { groupsActions, groupsQuery, userIdStream } = dependencies;

  return async (payload) => {
    validateGroup(payload, { groups: groupsQuery.current });

    const group = {
      id: createUuid(),
      user: userIdStream.current,
      ...payload,
    };

    await groupsActions.set(group);
  };
}
