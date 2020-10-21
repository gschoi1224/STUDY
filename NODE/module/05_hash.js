// 단방향 암호화
/*
    복호화할 수 없는 암호화 방식. 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없음. 복호화할 수 없으므로 암호화라고 표현하는 대신 해시 함수라고 부르기도 함
    고객의 비밀번호를 암호화해서 데ㅣ터베이스에 저장 -> 로그인할 때마다 입력받은 비밀번호를 같은 암호화 알고리즘으로 암호화 -> 데이터베이스의 비밀번호와 비교
    해시기법 : 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식
    예) abcdefgh => evew, ijklm => zvsf 변환 입력 문자열의 길이는 다르지만 출력 문자열의 길이는 네 자리로 고정되어 있음
*/

const crypto = require('crypto');

console.log('base64 : ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex : ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64 : ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
/*
    base64 :  dvfV6nyLRRt3NxKSlTHOkkEGgqW2HRtfu19Ou/psUXvwlebbXCboxIPmDYOFRIpqav2eUTBFuHaZri5x+usy1g==
    hex :  76f7d5ea7c8b451b773712929531ce92410682a5b61d1b5fbb5f4ebbfa6c517bf095e6db5c26e8c483e60d8385448a6a6afd9e513045b87699ae2e71faeb32d6
    base64 :  cx49cjC8ctKtMzwJGBY853itZeb6qxzXGvuUJkbWTGn5VXAFbAwXGEOxU2Qksoj+aM2GWPhc1O7mmkyohXMsQw==
*/
// createHash(알고리즘) : 사용할 해시 알고리즘을 넣는다. md5, sha1, sha256, sha512 등이 가능하지만 md5, sha1은 이미 취약점이 발견됨
// update(문자열) : 변환할 문자열을 넣는다.
// digset(인코딩) : 인코딩할 알고리즘을 넣는다. base64, hex, latin1이 주로 사용됨. 그 중 base64가 결과 문자열이 가장 잛아 애용됨
