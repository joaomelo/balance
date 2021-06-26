import { createUuid } from '../../../app/ids';
import { validateGroup } from '../body';

export async function setGroupCommand (dependencies, payload) {
  const {
    groupsMutations,
    groupsWithRelationsSelector,
    userIdSelector
  } = dependencies;

  validateGroup(
    { groups: groupsWithRelationsSelector.current },
    payload
  );

  const group = {
    id: createUuid(),
    user: userIdSelector.current,
    ...payload
  };

  await groupsMutations.set(group);
}
