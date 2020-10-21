// 읽고(Read), 해석하고(Eval), 결과물을 반환하고(Print), 종료할 때까지 반복한다(Loop) == REPL(Read Evel Print Loop)
// ctrl + ` = 비주얼 스튜디오 코드 콘솔 
// > node : node 시작
// .exit : node 끝 ctrl+c 두번도 가능

function helloWorld() {
    console.log("hello World");
    helloNode();
}

function helloNode() {
    console.log("Hello node");
}

helloWorld();

// node로 js 파일 실행 
// > node [자바스크립트 파일 경로] .js는 생략 가능
