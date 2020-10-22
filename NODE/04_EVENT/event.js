// 직접 이벤트를 만드는 방법
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {   // on과 같음
    console.log('이벤트 1');
});

myEvent.on('event2', () => {    // on(이벤트명, 콜백) : 이벤트 이름과 이벤트 발생 시의 콜백을 연결해줌. 여러 개를 다는 것도 가능
    console.log('이벤트 2');
});

myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});

myEvent.once('event3', () => {
    console.log('이벤트 3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
    console.log('이벤트 4');
});

myEvent.removeAllListeners('event4');

myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
    console.log('이벤트 5');
}
myEvent.on('event5', listener);
//myEvent.removeListener('event5', listener);
myEvent.off('event5', listener);
// off (이벤트명, 리스너) : removeListner와 기능이 같음
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));