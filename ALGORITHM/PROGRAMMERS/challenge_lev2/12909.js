function solution(s) {
    if (
        [...s].filter(str => str === '(').length !==
        [...s].filter(str => str === ')').length
    )
        return false;
    let left = 0,
        right = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') left++;
        if (s[i] === ')') right++;
        if (left < right) {
            return false;
        }
    }
    return true;
}

console.log(solution('()()')); // true
console.log(solution('(())()')); // true
console.log(solution(')()(')); // false
console.log(solution('(()(')); // false
