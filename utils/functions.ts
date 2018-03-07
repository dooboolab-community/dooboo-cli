'use strict';

import shelljs = require('shelljs');
import fs = require('fs');

const toCamelCase = function(str, cap1st) {
  return ((cap1st ? '-' : '') + str).replace(/-+([^-])/g, function(a, b) {
    return b.toUpperCase();
  });
}

export const isCamelCase = function(str) {
  var strArr = str.split('');
  var string = '';
  for(var i in strArr){
    if (strArr[i].toUpperCase() === strArr[i]) {
      string += '-'+strArr[i].toLowerCase();
    } else {
      string += strArr[i];
    }
  }

  if (toCamelCase(str, true) === str) {
    return true;
  } else{
    return false;
  }
};

export const camelCaseToDash = function(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
};

export const camelize = function(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const upperCamelize = function (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return match.toUpperCase();
  });
}

export const fsExists = function (file) {
  return new Promise((resolve, reject) => {
    fs.exists(file, function(exists) {
      resolve(exists);
    });
  });
}

export const exec = function (command) {
  return new Promise((resolve, reject) => shelljs.exec(command, {}, (code, value, error) => {
    if (error) {
      return reject(error);
    }
    resolve(value);
  }))
}
