import { createUuid } from "../../../libs/helpers";
import { validateGroup } from "../body";

export function createSetGroup(dependencies) {
  const { groupsActions, groupsQuery, userIdStream } = dependencies;

  return async (payload) => {
    const currentGroups = groupsQuery.current;

    const newGroupsData = Array.isArray(payload) ? payload : [payload];
    const newGroups = newGroupsData.map((groupData) => {
      validateGroup(groupData, { groups: currentGroups });
      return {
        id: createUuid(),
        user: userIdStream.current,
        ...groupData,
      };
    });
    await groupsActions.set(newGroups);
  };
}
