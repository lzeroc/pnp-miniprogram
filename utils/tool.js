function array_unique(inputArr) {
  var key = ''
  var tmpArr2 = {}
  var val = ''
  var _arraySearch = function (needle, haystack) {
      var fkey = ''
      for (fkey in haystack) {
          if (haystack.hasOwnProperty(fkey)) {
              if ((haystack[fkey] + '') === (needle + '')) {
                  return fkey
              }
          }
      }
      return false
  }
  for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
          val = inputArr[key]
          if (_arraySearch(val, tmpArr2) === false) {
              tmpArr2[key] = val
          }
      }
  }
  return tmpArr2
}

function array_reverse(array, preserveKeys) {
  const isArray = Object.prototype.toString.call(array) === '[object Array]'
  const tmpArr = preserveKeys ? {} : []
  let key
  if (isArray && !preserveKeys) {
      return array.slice(0).reverse()
  }
  if (preserveKeys) {
      const keys = []
      for (key in array) {
          keys.push(key)
      }
      let i = keys.length
      while (i--) {
          key = keys[i]
          tmpArr[key] = array[key]
      }
  } else {
      for (key in array) {
          tmpArr.unshift(array[key])
      }
  }
  return tmpArr
}

module.exports = {
  array_unique,
  array_reverse
};
