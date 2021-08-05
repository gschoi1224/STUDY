function solution(answers) {
    const s1 = [1, 2, 3, 4, 5];
    const s2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const s3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    let c1 = 0,
        c2 = 0,
        c3 = 0;
    answers.forEach((a, i) => {
        if (s1[i % s1.length] === a) c1++;
        if (s2[i % s2.length] === a) c2++;
        if (s3[i % s3.length] === a) c3++;
    });
    const m = Math.max(c1, c2, c3);
    const answer = [];
    if (m === c1) {
        answer.push(1);
    }
    if (m === c2) {
        answer.push(2);
    }
    if (m === c3) {
        answer.push(3);
    }
    return answer;
}
console.log(solution([1, 2, 3, 4, 5])); // [1]
console.log(solution([1, 3, 2, 4, 2])); // [1, 2, 3]
