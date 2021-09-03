function solution(s) {
    let zero = 0;
    let change = 0;
    while (s !== '1') {
        zero += s.match(/0/g) && s.match(/0/g).length;
        s = s.replace(/0/g, '');
        change++;
        s = s.length.toString(2);
    }
    return [change, zero];
}

console.log(solution('110010101001')); // [3,8]
console.log(solution('01110')); // [3,3]
console.log(solution('1111111')); // [4,1]
