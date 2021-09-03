function solution(msg) {
    var answer = [];
    const dic = [
        '',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    let i = 0;
    while (i < msg.length) {
        let k = 0;
        let str = msg.slice(i, k + i);
        while (dic.indexOf(str) > -1 && i + k <= msg.length) {
            str = msg.slice(i, ++k + i);
        }
        if (dic.indexOf(str) === -1) {
            answer.push(dic.indexOf(str.slice(0, -1)));
            dic.push(str);
            i += k - 1;
        } else {
            answer.push(dic.indexOf(str));
            break;
        }
    }
    return answer;
}

console.log(solution('KAKAO')); // [11, 1, 27, 15]
console.log(solution('TOBEORNOTTOBEORTOBEORNOT')); // [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
console.log(solution('ABABABABABABABAB')); // [1, 2, 27, 29, 28, 31, 30]
