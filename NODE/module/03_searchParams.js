const {URL} = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams : ', myURL.searchParams);
console.log('searchParams.getAll() : ', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값을 가져옴
console.log('searchParams.get() : ', myURL.searchParams.get('limit'));  // 키에 해당하는 첫번째 값만 가져옴
console.log('searchParams.has() : ', myURL.searchParams.has('page'));   // 해당 키가 있는지 없는지를 검사

console.log('searchParams.keys() : ', myURL.searchParams.keys());   // 키 목록
console.log('searchParams.values() : ', myURL.searchParams.values());   // 값 목록

myURL.searchParams.append('filter', 'es3');     // 해당 키를 추가 키의 값이 있으면 유지하고 하나 더 추가
myURL.searchParams.append('filter', 'es5');     
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');    // 같은 키의 값들을 모두 지우고 새로 추가
console.log(myURL.searchParams.getAll('filter'));   

myURL.searchParams.delete('filter');    // 해당 키를 제거
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString() : ', myURL.searchParams.toString());   // 조작한 searchParams객체를 다시 문자열로 만듦
myURL.search = myURL.searchParams.toString();