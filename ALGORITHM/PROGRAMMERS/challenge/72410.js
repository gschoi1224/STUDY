function solution(new_id) {
    var answer = new_id;
    if (
        new_id.length < 3 ||
        new_id.length > 15 ||
        new_id.split('').filter(id => !/[a-z0-9\-\_\.]/g.test(id)).length ||
        new_id[0] === '.' ||
        new_id[new_id.length - 1] === '.'
    ) {
        let arr = new_id.toLowerCase().split('');
        arr = arr.filter(a => /[a-z0-9\_\.\-]/g.test(a));
        answer = arr
            .join('')
            .replace(/\.+/g, '.')
            .replace(/^\.|\.$/g, '');
        if (answer.length === 0) answer = 'a';
        if (answer.length > 15) {
            answer = answer.slice(0, 15).replace(/\.$/g, '');
        }
        const last = answer[answer.length - 1];
        while (answer.length < 3) {
            answer += last;
        }
    }
    return answer;
}

console.log(solution('...!@BaT#*..y.abcdefghijklm')); // "bat.y.abcdefghi"
console.log(solution('z-+.^.')); // "z--"
console.log(solution('=.=')); // 	"aaa"
console.log(solution('123_.def')); // 	"123_.def"
console.log(solution('abcdefghijklmn.p')); // "abcdefghijklmn"

const solution = new_id => {
    const id = new_id
        .toLowerCase()
        .replace(/[^\w\d-_.]/g, '') // ^는 부정문자셋으로 뒤에 오는 문자들이 포함되지 않는지 확인
        .replace(/\.{2,}/g, '.')
        .replace(/^\.|\.$/g, '')
        .padEnd(1, 'a') // 1번째 자리에 없으면 a로 채움
        .slice(0, 15)
        .replace(/^\.|\.$/g, '');
    return id.padEnd(3, id[id.length - 1]);
};
