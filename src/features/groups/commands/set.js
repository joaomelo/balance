import { createUuid } from '../../../app/helpers';
import { validateGroup } from '../body';

export async function setGroupCommand (dependencies, payload) {
  const {
    groupsMutations,
    groups,
    userId
  } = dependencies;

  validateGroup({ groups }, payload);

  const group = {
    id: createUuid(),
    user: userId,
    ...payload
  };

  await groupsMutations.set(group);
}
