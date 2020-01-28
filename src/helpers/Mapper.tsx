import { camelCase, mapKeys } from 'lodash';

export function listToCamelCase(list: any[]) {
  return list.map((elem) => mapKeys(elem, (v, k) => camelCase(k)));
}

export function objectToCamelCase(obj: any) {
  return mapKeys(obj, (v, k) => camelCase(k));
}
