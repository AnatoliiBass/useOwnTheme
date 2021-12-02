import * as data from 'json/test2.json';
const container = document.getElementById('container')
//function Flatten is making simple Array for next operations
const flatDeep = (arr, d = 1) => {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice()
}
//function isEmpty return true if json has empty objects or array, 
//return false if json is not empty and remove empty elements inside array
const isEmpty = (obj = {}) => {
   let isEmpty, count = 0, returnObj
   const deleteEmptyItems = (obj, count) => {
      obj.splice(count, 1)
   }
   if (Array.isArray(obj)) {
      returnObj = flatDeep(obj, Infinity)
      const copy = [...returnObj]
      console.log(copy);
      if (Object.keys(copy).length === 0) {
         isEmpty = true
      } else {
         isEmpty = true
         copy.forEach(item => {
            if (Object.keys(item).length > 0) {
               isEmpty = false
               count += 1
            } else {
               console.log(returnObj, count);
               deleteEmptyItems(returnObj, count)
            }
         })
      }
   } else if (obj instanceof Object) {
      if (Object.keys(obj).length === 0) {
         isEmpty = true
      } else {
         isEmpty = false
      }
   }
   return {
      empty: isEmpty,
      newData: returnObj
   }
}

console.log(data.default)
const { empty, newData } = isEmpty(data.default)
console.log(empty, newData)

// console.log(isEmpty(data.default))

// console.log(data.default)