import { setAccountCase } from './set-account';

export const accountsServiceConfig = {
  actions: {
    setAccountCase,
    delAccountCase: ({ del }, id) => del(id)
  }
};
