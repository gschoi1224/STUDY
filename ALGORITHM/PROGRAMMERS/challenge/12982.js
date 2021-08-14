function solution(d, budget) {
    var answer = 0;
    d.sort((a, b) => a - b);
    let sum = 0;
    d.forEach(cost => {
        sum += cost;
        if (sum <= budget) answer++;
        else return false;
    });
    return answer;
}

console.log(solution([1, 3, 2, 5, 4], 9)); // 3
console.log(solution([2, 2, 3, 3], 10)); //4
