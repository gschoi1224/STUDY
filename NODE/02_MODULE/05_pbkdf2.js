// pbkdf2는 간단히 말하면 기존 문자열에 salt 라고 불리는 묹열을 붙인 후 해시 알고리즘을 반복해서 적용하는 것

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {  // 64 바이트 길이의 문자열을 만듦. 이것이 salt가 됨 randomBytes이므로 매번 실행할 때마다 결과가 달라짐 
    const salt = buf.toString('base64');
    console.log('salt : ', salt);   // salt :  4a33Sgb4qe+0I+5V6XyZ/rPcCdZY4sdbOOABzd3xXVDBBeGMTbiKp9TPxbwTGt+RoHcqG6mx1lpAKPnwUMdyhQ==
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {   
        // pbkdf2(비밀번호, salt, 반복횟수, 출력 바이트, 해시 알고리즘) : 해시 알고리즘으로 변환된 결괏값을 다시 sha512로 변환하는 과정을 반복횟수만큼 반복함
        console.log('password : ', key.toString('base64'));     // password :  CGSQka9oClus/cBVAbtHPlnUW6cU496CnWkeu69es7siYCk/JqdAikyGj0tY1/jLGfg74UsFUvJArlz6DqtqmQ==
    });
});