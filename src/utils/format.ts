import { isKeyValuePairObj, KeyValuePairObj } from '../types';

// format issue title in table view
export const formatIssueTitle = (title: string, limit: number): string => {
  if (title.length > limit) {
    title = title.slice(0, limit) + '...';
  }

  return title;
};

// format snake case to camel case
// TODO: failed at the recursion in TS

// export const snakeToCamel = (str: string): string => {
//   return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
// };

// export const deepSnakeToCamel = (data: any): typeof data => {
//   if (isKeyValuePairObj(data)) {
//     const result: KeyValuePairObj = {};
//     for (let key in data) {
//       result[deepSnakeToCamel(key)] = deepSnakeToCamel(data[key]);
//     }
//     return result;
//   }
//   return data;
// };
