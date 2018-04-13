function sayHello(name) {
    console.log('Hello ' +name);
} 

// sayHello('Russell');

var message = '';
/** Will result in error since with node js, scoped to this file only **/
// console.log(windows.message);

console.log(module);
/** Will result in error since with node js, scoped to this file only **/
// console.log(window.module);