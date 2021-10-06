const reverse = x => {
    x = x.toString();
    let answer = 0;
    if (x[0] === '-') {
        answer = Number(x.slice(1).split('').reverse().join('')) * -1;
    } else {
        answer = Number(x.split('').reverse().join(''));
    }
    if (Math.pow(2, 31) - 1 < answer || Math.pow(2, 31) * -1 > answer) {
        return 0;
    }
    return answer;
};
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(1534236469)); // 9646324351
