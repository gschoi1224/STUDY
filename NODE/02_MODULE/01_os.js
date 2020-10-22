const os = require('os');

console.log('운영체제 정보------------------------');
console.log('os.arch() : ', os.arch()); 
// x64 : process.arch와 동일
console.log('os.platform() : ', os.platform());
// win32 : process.platform과 동일
console.log('os.type() : ', os.type());
// Windows_NT : 운영체제의 종류
console.log('os.uptime() : ', os.uptime());
// 234283 : 운영체제 부팅 이후 흐른 시간(초), process.uptime()은 노드의 실행 시간
console.log('os.hostname() : ', os.hostname());
// 컴퓨터의 이름
console.log('os.release() : ', os.release());
// 10.0.18362 : 운영체제의 버전

console.log('경로---------------------------------');
console.log('os.homedir() : ', os.homedir());
// 홈 디렉토리 경로
console.log('os.tmpdir() : ', os.tmpdir());
// 임시 파일 저장 경로

console.log('cpu 정보 ----------------------------');
console.log('os.cpus() : ', os.cpus());
// 컴퓨터의 코어 정보
console.log('os.cpus().length : ', os.cpus().length);

console.log('메모리 정보 ---------------------------');
console.log('os.freemem() : ', os.freemem());
// 사용 가능한 메모리(RAM)
console.log('os.totalmem() : ', os.totalmem());
// 전체 메모리 용량

// os.constants : 에버라 발생했을 때, EADDRINUSE나 ECONNRESET 같은 에러코드를 함께 보여줌 (에러코드가 너무 많아서 외울 수 없으므로 발생할 때마다 검색해보는게 좋음)