// const snakeToCamel = str => {
//   return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
// };

// /**
//  * 
//  * @param {any} data 
//  * @returns 
//  */
// const deepSnakeToCamel = data => {
//   if (typeof data === "object" && data !== null && !Array.isArray(data) && !(data instanceof Date)) {
//     const result = {}
//     for (let key in data) {
//       result[snakeToCamel(key)] = deepSnakeToCamel(data[key])
//     }
//     return result;
//   }
//   return data;
// };
