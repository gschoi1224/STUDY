const cluster = require('cluster'); // 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
                                    // 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있음. 메모리는 공유하지 못하지만 레디스 등의 서버를 도입해 해결 가능
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs ; i += 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다`);
        console.log('code', code, 'signal', signal);
        cluster.fork(); // 워커 프로세스가 종료되었을 때 새로 하나를 생성
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => {  // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}
/*
    13864번 워커 실행
    16852번 워커 실행
    21680번 워커 실행
    27600번 워커 실행
    27600번 워커가 종료되었습니다
    code 1 signal null
    21680번 워커가 종료되었습니다
    code 1 signal null
    16852번 워커가 종료되었습니다
    code 1 signal null
    13864번 워커가 종료되었습니다
    code 1 signal null

    http://localhost:8086에 접속하면 1초 후 콘솔에 워커가 종료되었다는 메시지가 뜸. 4번 새로고침을 하면 모든 워커가 종료되어 서버가 응답하지 않음
    code는 exit의 인수로 넣어준 코드가 출력되고
    signal은 존재하는 경우 프로세스를 종료한 신호의 이름이 출력됨

*/