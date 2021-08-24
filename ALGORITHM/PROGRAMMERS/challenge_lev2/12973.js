function solution(s) {
    const stack = [];
    for (let i of s) {
        if (stack.length === 0) stack.push(i);
        else if (stack[stack.length - 1] === i) stack.pop();
        else stack.push(i);
    }
    if (stack.length === 0) return 1;
    else return 0;
}

console.log(solution('baabaa')); // 1
console.log(solution('cdcd')); // 0
