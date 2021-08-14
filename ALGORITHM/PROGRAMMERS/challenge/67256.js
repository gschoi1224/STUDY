function solution(numbers, hand) {
    var answer = '';
    let right = [3, 2];
    let left = [3, 0];
    numbers.forEach(n => {
        let now = [3, 1];
        if (n > 0) {
            now = [parseInt((n - 1) / 3), (n - 1) % 3];
        }
        if (now[1] === 0) {
            answer += 'L';
            left = now;
        } else if (now[1] === 2) {
            answer += 'R';
            right = now;
        } else if (
            Math.abs(right[0] - now[0]) + Math.abs(right[1] - now[1]) >
            Math.abs(left[0] - now[0]) + Math.abs(left[1] - now[1])
        ) {
            answer += 'L';
            left = now;
        } else if (
            Math.abs(right[0] - now[0]) + Math.abs(right[1] - now[1]) <
            Math.abs(left[0] - now[0]) + Math.abs(left[1] - now[1])
        ) {
            answer += 'R';
            right = now;
        } else if (hand === 'right') {
            answer += 'R';
            right = now;
        } else if (hand === 'left') {
            answer += 'L';
            left = now;
        }
    });
    return answer;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right')); //"LRLLLRLLRRL"
console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left')); //"LRLLRRLLLRR"
console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right')); //"LLRLLRLLRL"
