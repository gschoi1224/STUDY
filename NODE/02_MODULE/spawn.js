const spawn = require('child_process').spawn;

const process = spawn('python', ['test.py']);   // spawn(명령어, 옵션 배열)

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
}); // 실행 > 에러

/*
    exec과 spawn의 차이
    exec은 셸을 실행해서 명령어를 수행하고, spawn은 새로운 프로세스를 띄우면서 명령어를 실행
    spawn의 세 번째 인수로 { shell : true } 을 제공하면 exc처럼 셸을 실행해서 명령어를 수행함
*/