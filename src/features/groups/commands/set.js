import { createUuid } from '../../../app/ids';
import { validateGroup } from '../body';

export async function setGroupCommand (dependencies, payload) {
  const {
    groupsMutations,
    activeGroupsSelector,
    userIdSelector
  } = dependencies;

  validateGroup(
    { groups: activeGroupsSelector.current },
    payload
  );

  const group = {
    id: createUuid(),
    user: userIdSelector.current,
    ...payload
  };

  await groupsMutations.set(group);
}
