function solution(n) {
    let binary = n.toString(2);
    let num = n + 1;
    const oneCnt = binary.split('').filter(b => b === '1').length;
    while (
        num
            .toString(2)
            .split('')
            .filter(b => b === '1').length !== oneCnt
    ) {
        num++;
    }
    return num;
}

console.log(solution(78)); // 83
console.log(solution(15)); // 23
