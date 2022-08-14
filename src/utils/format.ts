import { isKeyValuePairObj, KeyValuePairObj } from '../types';

// format issue title in table view
export const toShortStr = (str: string, limit: number): string => {
  if (str.length > limit) {
    str = str.slice(0, limit) + '...';
  }

  return str;
};

// format snake case to camel case
// TODO: failed at the recursion in TS

export const snakeToCamel = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const deepSnakeToCamel = (data: any): typeof data => {
  if (isKeyValuePairObj(data)) {
    const result: KeyValuePairObj = {};
    for (let key in data) {
      result[snakeToCamel(key)] = data[key];
    }
    return result;
  }
  return data;
};
