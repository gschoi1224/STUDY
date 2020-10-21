console.log(__filename);    //D:\CGS\최경선\git\STUDY\NODE\module\filename.js
console.log(__dirname);     //D:\CGS\최경선\git\STUDY\NODE\module

// 실행시 현재 파일명과 현재 파일 경로를 알려줌
// 윈도가 아니라면 \ 대신 /로 폴더 경로가 구분됨 
// 경로가 문자열로 반환되기도 하고 \나 / 같은 경로 구분자 문제도 있으므로 path 모듈과 함께 씀