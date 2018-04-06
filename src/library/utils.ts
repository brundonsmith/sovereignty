
export function deepMerge(obj1, obj2) {
  if(Array.isArray(obj1) && Array.isArray(obj2)) {
    return obj1.concat(obj2);
  } else if(typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 && obj2) {
    var newObj = {};
    Object.keys(obj1).concat(Object.keys(obj2))
      .filter((key, index, arr) => arr.indexOf(key) === index)
      .forEach(key => {
        newObj[key] = deepMerge(obj1[key], obj2[key])
      })
    return newObj;
  } else {
    if(typeof obj2 !== 'undefined') {
      return obj2;
    } else {
      return obj1;
    }
  }
}
