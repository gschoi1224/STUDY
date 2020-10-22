// 버퍼 : 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 없도록 하는데 이때 메모리에 저장된 데이터가 버퍼
const buffer = Buffer.from('저를 버퍼로 바꿔주세요');   
console.log('from() :', buffer);    // from() : <Buffer ec a0 80 eb a5 bc 20 eb b2 84 ed 8d bc eb a1 9c 20 eb b0 94 ea bf 94 ec a3 bc ec 84 b8 ec 9a 94>
// from(문자열) : 문자열로 버퍼로 바꿔줌
console.log('length :', buffer.length); // length : 32
// length : 버퍼의 크기(바이트 단위)
console.log('toString() :', buffer.toString()); // toString() : 저를 버퍼로 바꿔주세요
// toString(버퍼) : 버퍼를 다시 문자열로 바꿔줌, 이때 base64나 hex를 인수로 넣으면 해당 인코딩으로도 변환 가능

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat() :', buffer2.toString());  // concat() : 띄엄 띄엄 띄어쓰기
// concat(배열) : 배열 안에 든 버퍼들을 하나로 합침

const buffer3 = Buffer.alloc(5);    // alloc() : <Buffer 00 00 00 00 00>
console.log('alloc() :', buffer3);
// alloc(바이트) : 빈 버퍼를 생성함. 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성됨