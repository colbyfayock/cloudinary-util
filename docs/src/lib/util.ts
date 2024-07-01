/**
 * sortByKey
 * @description Sort the given array by the key of an object
 */

export function sortByKey(
  array: Array<object> = [],
  key: string,
  type: string = "asc"
) {
  function compare(a: object, b: object) {
    let keyA = a[key];
    let keyB = b[key];

    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }

    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  }

  let newArray = [...array];

  if (typeof key !== "string") return newArray;

  newArray = newArray.sort(compare);

  if (type === "desc") {
    return newArray.reverse();
  }

  return newArray;
}
