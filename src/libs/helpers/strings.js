import { camelCase as camelCaseLodash } from 'lodash';

export function camelCase (...strings) {
  return camelCaseLodash(strings.join('-'));
}
