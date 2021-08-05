function solution(citations) {
    var answer = 0;
    citations.sort((a, b) => a - b);
    for (let i = 0; i <= citations.length; i++) {
        if (citations.filter(s => s >= i).length >= i) {
            answer = i;
        } else {
            break;
        }
    }
    return answer;
}
console.log(solution([3, 0, 6, 1, 5])); // 3
