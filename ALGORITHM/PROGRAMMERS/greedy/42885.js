function solution(people, limit) {
    var answer = 0;
    people.sort((a, b) => b - a);
    let i = 0;
    let j = people.length - 1;

    while (i < j) {
        let sum = people[i] + people[j];
        i++;
        if (sum <= limit) {
            j--;
        }
        answer++;
    }
    if (i === j) answer++;
    return answer;
}

console.log(solution([70, 50, 80, 50], 100)); // 3
console.log(solution([70, 80, 50], 100)); // 3
