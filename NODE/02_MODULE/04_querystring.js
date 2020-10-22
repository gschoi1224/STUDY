const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse() : ', query);
/*
    querystring.parse() :  [Object: null prototype] {
        page: '3',
        limit: '10',
        category: [ 'nodejs', 'javascript' ]
    } url의 query 부분을 자바스크립트 객체로 분해
*/
console.log('querystring.stringify() : ', querystring.stringify(query));
// querystring.stringify() :  page=3&limit=10&category=nodejs&category=javascript
// 분해된 query 객체를 다시 분자열로 조립