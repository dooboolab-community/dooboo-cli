const camelCaseToDash = function(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
};

String.prototype.toCamelCase = function(cap1st) {
  'use strict';
  return ((cap1st ? '-' : '') + this).replace(/-+([^-])/g, function(a, b) {
      return b.toUpperCase();
  });
};

const isCamelCase = function(str) {
  var strArr = str.split('');
  var string = '';
  for(var i in strArr){
    if (strArr[i].toUpperCase() === strArr[i]) {
      string += '-'+strArr[i].toLowerCase();
    } else {
      string += strArr[i];
    }
  }

  if (string.toCamelCase(true) === str) {
    return true;
  } else{
    return false;
  }
};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function upperCamelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return match.toUpperCase();
  });
}

module.exports = {
  camelCaseToDash,
  isCamelCase,
  camelize,
  upperCamelize,
};
