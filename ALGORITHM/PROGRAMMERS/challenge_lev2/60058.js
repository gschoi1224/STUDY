function solution(p) {
    return division(p.split('')).join('');
}

function isValance(arr) {
    let left = 0;
    let right = 0;
    let result = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(') left++;
        else right++;
        if (left < right) {
            result = false;
            break;
        }
    }
    return result;
}

function division(arr) {
    let left = 0;
    let right = 0;
    let u = [],
        v = [];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        let c = arr[i];
        if (c === '(') left++;
        else right++;
        if (left === right) {
            u = arr.slice(0, i + 1);
            v = arr.slice(i + 1);
            if (isValance(u)) {
                result.push(...u);
                result.push(...division(v));
            } else {
                result.push('(');
                result.push(...division(v));
                result.push(')');
                result.push(
                    ...u
                        .filter((_, idx) => idx > 0 && idx < u.length - 1)
                        .map(s => (s === '(' ? ')' : '(')),
                );
            }
            break;
        }
    }
    return result;
}

console.log(solution('(()())()')); // "(()())()"
console.log(solution(')(')); // "()"
console.log(solution('()))((()')); // "()(())()"
console.log(solution('')); // ""
