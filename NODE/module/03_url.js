// url 처리의 두 가지 방식
// 1. WHATWG(웹 표준을 정하는 단체의 이름) 방식
// url 모듈 안에 URL 생성자가 있음. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됨
// WHATWG에만 있는 username, password, origin, searchParams 가 존재함
// search 부분을 serachParams 라는 특수한 객체로 반환하므로 유용함
const url = require('url');
const {URL} = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL() : ', myURL);
console.log('url.format() : ', url.format(myURL));
console.log('===============================');

// 2. 예전부터 노드에서 사용하던 방식
// url.parse(주소) : 주소를 분해함. WHATWG 방식과 비교하면 username과 password대신 auth속성이 있고, searchParams대신 query가 있음
// url.format(객체) : WHATWG 방식 url과 기존 노드의 url을 모두 사용할 수 있음. 분해되었던 url 객체를 다시 원래 상태로 조립함

// host 부분 없이 pathname 부분만 오는 주소인 경우 (예시 : /book/bookList.aspx)에는  WHATWG 방식이 처리할 수 없음
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse() : ', parsedUrl);
console.log('url.format() : ', url.format(parsedUrl));
