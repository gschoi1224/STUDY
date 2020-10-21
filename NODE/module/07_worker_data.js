const {
    Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) { // 부모일 때
    const threads = new Set();  // 중복되는 값을 가지지 ㅇ낳는 값들의 리스트 순서가 존재하지 않음
    threads.add(new Worker(__filename, {
        workerData : {start : 1},   // 원하는 데이터를 보낼 수 있음
    }));
    threads.add(new Worker(__filename, {
        workerData : {start : 2},
    }));
    for (let worker of threads) {
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log('job done');
            }
        });
    }
} else {    // 워커일 때
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}