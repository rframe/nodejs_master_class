var _ = require('underscore');

// How require resolved modules
// Core module
// File or folder in this project
// node_modules

var result = _.contains([1, 2, 3], 2)
console.log(result);