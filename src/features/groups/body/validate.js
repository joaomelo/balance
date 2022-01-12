import { AppError } from "../../../libs/errors";

export function validateGroup(groupData, context) {
  const { groups } = context;
  const { id, name } = groupData;

  if (typeof name !== "string" || name.length < 2 || name.length > 64) {
    throw new GroupNameInvalidError();
  }

  const otherGroupsNames = groups
    .filter((g) => g.id !== id)
    .map(({ name }) => name);

  if (otherGroupsNames.includes(name)) {
    throw new GroupNameNonUniqueError();
  }
}

export class GroupNameInvalidError extends AppError {
  constructor() {
    super({
      code: "GROUPS/NAME_INVALID",
      isOperational: true,
    });
    Error.captureStackTrace(this, GroupNameInvalidError);
  }
}

export class GroupNameNonUniqueError extends AppError {
  constructor() {
    super({
      code: "GROUPS/NON_UNIQUE_NAME",
      isOperational: true,
    });
    Error.captureStackTrace(this, GroupNameNonUniqueError);
  }
}
