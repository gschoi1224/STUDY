const solution = s =>
    s.length % 2 === 0
        ? s.slice(s.length / 2 - 1, s.length / 2 + 1)
        : s.slice(parseInt(s.length / 2), parseInt(s.length / 2) + 1);

console.log(solution('abcde')); // 'c'
console.log(solution('qwer')); // 'we'

// string.substr(start, length) // 파라미터로 입력받은 start 부터 length 길이만큼 잘라냄
// string.substring(start, end) // start 부터 end 까지 잘라냄
// string.slice // substring과 같임
// slice 와  substring 차이는 start > end 일때 substring은 start와 end를 바꿔서 처리하고 slice 는 공백을 출력하고 인덱스가 음수인 경우 slice는 끝에서부터 계산하여 출력
// slice는 start또는 end값이 음수일 경우 유리
