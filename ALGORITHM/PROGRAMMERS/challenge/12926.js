function solution(s, n) {
    let answer = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < s.length; i++) {
        if (upper.indexOf(s[i]) > -1) {
            answer += upper[(upper.indexOf(s[i]) + n) % upper.length];
        } else if (lower.indexOf(s[i]) > -1) {
            answer += lower[(lower.indexOf(s[i]) + n) % lower.length];
        } else {
            answer += ' ';
        }
    }
    return answer;
}
console.log(solution('AB', 1)); // 'BC'
console.log(solution('z', 1)); // 'a'
console.log(solution('a B z', 4)); // 'e F d'
