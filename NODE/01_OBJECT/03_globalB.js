const A = require('./globalA');

globalThis.message = '안녕하세요';
console.log(A());

// globalB에서 넣은 global.message 값을 globalA에서도 이용할 수 있음