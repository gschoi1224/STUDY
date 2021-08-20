function solution(p) {
    var answer = '';
    let left = 0;
    let right = 0;
    p = p.split('');
    let u = '';
    let v = '';
    for (let i = 0; i < p.length; i++) {
        let c = p[i];
        if (c === '(') left++;
        else right++;
        if (left === right) {
            u = p.slice(0, i + 1);
            v = p.slice(i + 1);
            break;
        }
    }
    console.log(p, u, v);
    return p.join('');
}

function isValance(str) {}

console.log(solution('(()())()')); // "(()())()"
console.log(solution(')(')); // "()"
console.log(solution('()))((()')); // "()(())()"
console.log(solution('')); // ""
