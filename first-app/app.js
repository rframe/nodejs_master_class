function sayHello(name) {
    console.log('Hello ' +name);
} 

// sayHello('Russell');

// console.log(window);

// setTimeout();
// clearTimeout();

// setInterval();
// clearInterval();

var message = '';
/** Will result in error since with node js, scoped to this file only **/
console.log(windows.message);
// global.message;

// window.setTimeout
// global.setTimeout