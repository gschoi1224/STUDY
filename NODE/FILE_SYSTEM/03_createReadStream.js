/* 
    버퍼가 편리하기는 하지만 만약 용량이 100MB인 파일이 있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야함 이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용됨
    모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로 파일 읽기, 압축, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있음
    그래서 버퍼의 크기를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장함 
    이를 편리하게 만든 것이 스트림
*/
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark : 16});  // 읽기 스트림 만들기 createReadStream(읽을 파일 경로, 옵션) 기본값은 64
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', err => {
    console.log('error :', err);
});