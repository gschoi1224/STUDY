const dep1 = require('./07_dep1');
const dep2 = require('./dep2');

dep1();
dep2();


// dep1.js에서는 require('./dep2')가 실행되고 dep2.js 에서는 require('./dep1')가 실행됨
// 이러한 현상을 순환 참조라고 부르고 이럴 경우에는 순환 참조되는 대상을 빈 객체로 만듦