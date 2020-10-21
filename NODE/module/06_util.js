// util 각종 편의 기능을 모아둔 모듈 계속해서 API가 추가되어 있음

const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
},  'dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요!');
dontUseMe(1, 2); 
// util.deprecate : 함수가 deprecated(중요도가 떨어져 더 이상 사요오디지 않고 앞으로는 사라지게 될 것) 처리되었음을 알림.
// 첫 번째 인수로 넣은 함수를 사용했을 때 경구 메시지가 출력됨. 두 번째 인수로 경고 메시지 내용을 넣으면 됨

const randomBytesPromise = util.promisify(crypto.randomBytes); 
// util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿈. 바꿀 함수를 인수로 제공하면 됨
randomBytesPromise(64)
.then((buf) => {
    console.log(buf.toString('base64'));
})
.catch(error => {
    console.error(error);
});
