function solution(s) {
    let answer = 0;
    const opens = ['(', '{', '['];
    const closes = [')', '}', ']'];
    const check = str => {
        str = str.split('');
        const covers = [];
        for (let i = 0; i < str.length; i++) {
            const idx = closes.indexOf(str[i]);
            if (idx > -1) {
                if (opens[idx] !== covers[covers.length - 1]) return 0;
                else {
                    covers.pop();
                }
            } else {
                covers.push(str[i]);
            }
        }
        if (covers.length > 0) {
            return 0;
        } else {
            return 1;
        }
    };
    for (let i = 0; i < s.length; i++) {
        s = s.slice(1) + s.slice(0, 1);
        const result = check(s);
        if (result === -1) return 0;
        answer += result;
    }
    return answer;
}

console.log(solution('[](){}')); // 3
console.log(solution('}]()[{')); // 2
console.log(solution('[)(]')); // 0
console.log(solution('}}}')); // 0
console.log(solution('([{)}]')); // 0
