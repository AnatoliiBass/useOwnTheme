import * as data from 'json/test.json';
const container = document.getElementById('container')
//function Flatten is making simple Array for next operations
const flatDeep = (arr, d = 1) => {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice()
}
//function isEmpty return true if json has empty objects or array, 
//return false if json is not empty and remove empty elements inside array
// and return new array
const isEmpty = (obj = {}) => {
   let isEmpty, count = 0, returnObj
   const deleteEmptyItems = (obj, count) => {
      obj.splice(count, 1)
   }
   if (Array.isArray(obj)) {
      returnObj = flatDeep(obj, Infinity)
      const copy = [...returnObj]
      if (Object.keys(copy).length === 0) {
         isEmpty = true
      } else {
         isEmpty = true
         copy.forEach(item => {
            if (Object.keys(item).length > 0) {
               isEmpty = false
               count += 1
            } else {
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
      newData: returnObj ? returnObj : [obj]
   }
}
//function creates all tables from json to use a recurtion
const createTable = (infoArray) => {
   const keys = Object.keys(infoArray[0])
   const table = document.createElement('table')
   table.setAttribute('border', '2')
   const caption = document.createElement('caption')
   caption.textContent = `Table #${numberTable}`
   table.append(caption)
   numberTable++
   const tbody = document.createElement('tbody')
   const trh = document.createElement('tr')
   const trd = document.createElement('tr')
   keys.forEach(item => {
      const th = document.createElement('th')
      th.textContent = item
      trh.append(th)
   })
   tbody.append(trh)
   infoArray.forEach(element => {
      const values = Object.values(element)
      values.forEach(item => {
         if (item instanceof Object) {
            const { empty, newData } = isEmpty(item)
            console.log(item, newData);
            if (!empty) {
               if (newData[0] instanceof Object) {
                  createTable(newData)
               }
            }
         }
         const td = document.createElement('td')
         td.textContent = item
         trd.append(td)
      })
      tbody.append(trd)
   })

   table.append(tbody)
   container.appendChild(table)
}

const { empty, newData } = isEmpty(data.default)
let numberTable = 1
console.log(empty, newData);
if (empty) {
   container.innerHTML = `<h1>Your JSON is empty</h1>`
} else {
   createTable(newData)
}

console.log([] instanceof Object)

// console.log(data.default)