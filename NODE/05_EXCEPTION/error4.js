// 예측이 불가능한 에러를 처리하는 방법
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
}); // 최후의 수단. 에러를 기록하는 정도로만 사용하고 에러를 기록한 후 process.exit()으로 프로세스를 종료하는 것이 좋음

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다');
}, 2000);