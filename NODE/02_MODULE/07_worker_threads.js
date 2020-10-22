// 노드에서 멀티 스레드 방식으로 작업하는 방법
const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

// isMainThread 현재 코드가 메인 스레드(기존에 동작하던 싱글 스레드를 메인 스레드 또는 부모 스레드라 부름)에서 실행되는지, 워커스레드에서 실행되는지 구분
if (isMainThread) { // 부모일 때
    const
    worker = new Worker(__filename);    // 현재 파일(__filename)을 워커 스레드에서 실행시키고 있음
    worker.on('message', message => console.log('from worker', message));   // 워커로부터 메시지 받기, 한 번만 메시지를 받고 싶으면 once('message)를 사용하면 됨
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping'); // 부모에서는 워커 생성 후 worker.postMessage로 워커에 데이터를 보낼 수 있음 
} else {    // 워커일 때
    parentPort.on('message', value => { // 워커는 parentPort.on('message) 이벤트 리스너로 부모로부터 메시지를 받고
    // 워커에서 on 메서드를 사용할 때는 직접 워커를 종료해야함 parnetPort.close()를 하면 부모와의 연결이 종료됨. 종료될 때는 worker.on('exit)이 실행됨
        console.log('from parent', value);
        parentPort.postMessage('pong');         // parentPort.postMessage()로 부모에게 메시지를 보냄
        parentPort.close();
    });
}