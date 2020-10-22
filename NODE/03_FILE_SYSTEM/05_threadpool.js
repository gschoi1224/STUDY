const crypto = require('crypto');

/*
    실행할 때마다 시간과 순서가 달라짐. 스레드풀이 작업을 동시에 처리하므로 어떤 작업이 먼저 처리될지 모름
    기본적으로 스레드풀의 개수가 네 개이기 때문에 1~4가 그룹으로 묶여있고 5~8이 그룹으로 묶여 있는 것을 확인할 수 있음

    명령 프롬프트에 SET UV_THREADPOOL_SIZE=1을 입력한 후 다시 해보면 작업이 순서대로 실행되는 것을 볼 수 있음
*/

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () =>{
    console.log('2 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7 :', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8 :', Date.now() - start);
});