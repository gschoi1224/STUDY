// 양방향 암호화
// 암호화된 문자열을 복호화할 수 있으며, 키(열쇠)라는 것이 사용됨. 대칭형 암호화에서 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야 함

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';
const cipher = crypto.createCipheriv(algorithm, key, iv); 
// cipher(알고리즘, 키, iv) : aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고, iv는 16바이트여야 함. iv는 암호화할 대 사용하는 초기화 벡터를 의미함
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
// cipher.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다. 보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용
result += cipher.final('base64');
// cipher.final(출력 인코딩) : 출력 결과물의 인코딩을 넣으면 암호화가 완료됨
console.log('암호화 : ' , result);  // 암호화 :  iiopeG2GsYlk6ccoBoFvEH2EBDMWv1kK9bNuDjYxiN0=

const decipher = crypto.createDecipheriv(algorithm, key, iv);
// crypto.createDecipheriv(알고리즘, 키, iv) : 복호화할 때 사용. 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 함
let result2 = decipher.update(result, 'base64', 'utf8');
// decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다. createCipheriv.update에서 utf8, base64의 순으로 넣었다면 createDecipher에서는 반대로 넣어야 함
result2 += decipher.final('utf8');
// decipher.final(출력 인코딩) : 복호화 결과물의 인코딩을 넣는다
console.log('복호화 : ', result2);  // 복호화 :  암호화할 문장