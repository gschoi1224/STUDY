const exec = require('child_process').exec;// 노드에서 다른 프로그래을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈
// 이름이 child_process(자식 프로세스)인 이유는 현재 노드 프로세스 외에 새로운 프로세르를 띄워서 명령을 수행하고, 노드 프로세스에 결과를 알려주기 때문

const process = exec('dir');

process.stdout.on('data', function(data) {  // 표준 출력
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {  // 표준 에러
    console.error(data.toString());
}); // 실행 에러