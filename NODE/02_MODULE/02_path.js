const path = require('path');
// 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈 (운영체제별로 겨올 구분자가 다르기 때문에 중요)

// 윈도 : C:\Users\CGS 처럼 \로 구분
// POSIX : /home/CGS 처럼 /로 구분 (유닉스 기반 운영체제, 맥과 리눅스가 속해있음)

const string = __filename;

console.log('path.sep : ', path.sep);
// / 경로의 구분자
console.log('path.delimiter : ', path.delimiter);
// 환경 변수의 구분자 process.envPATH를 입력하면 이 구분자로 구분되어있음 윈도 : ;, POSIX : :
console.log('==============================');

console.log('path.dirname() : ', path.dirname(string));
// path.dirname(경로) : 파일이 위치한 폴더 경로
console.log('path.extname() : ', path.extname(string));
// 파일의 확장자
console.log('path.basename() : ', path.basename(string));
// 파일의 이름(확장자포함)
console.log('path.basename - extname : ', path.basename(string, path.extname(string)));
// 파일의 이름만 표시하고 싶으면 basename의 두번째 인수로 파일의 확장자로 넣으면 됨
console.log('==============================');

console.log('path.parse() : ', path.parse(string));
//  파일의 경로를 root, dir, base, ext, name 으로 분리
console.log('path.format() : ', path.format({   // C:\users\CGS\path.js
    dir : 'C:\\users\\CGS',
    name : 'path',
    ext : '.js',
}));
// path.prase()한 경로를 합침
console.log('path.normalize() : ', path.normalize('C:\\\\users\\CGS\\\path.js'));   // C:\users\CGS\path.js
// /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환함
console.log('==============================');

console.log('path.isAbsolute(C:\\)',path.isAbsolute('C:\\'));
// 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알림
console.log('path.isAboluste(./home)', path.isAbsolute('./home'));
console.log("===============================");

console.log('path.relative() : ', path.relative('C:\\users\\CGS\\path.js', 'C:\\'));    // ..\..\..
// 경로를 두 개 넣으면 첫 번재 경로에서 두 번째 경로로 가는 방법을 알림
console.log('path.join() : ', path.join(__dirname, '..', '..', '/users', '.', '/CGS'));
// 여러 인수를 넣으면 하나의 경로로 합침, 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리함
console.log('path.resolve() : ', path.resolve(__dirname, '..', 'users', '.', '/CGS'));
// path.join과 비슷하나 /를 만나면 path.resolve는 절대경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리함
// path.join('/a', '/b', 'c'); 결과 : /a/b/c
// path.resolve('/a', '/b', 'c'); 결과 : /b/c

// 노드는 require.main 파일을 기준으로 상대 경로를 인식함