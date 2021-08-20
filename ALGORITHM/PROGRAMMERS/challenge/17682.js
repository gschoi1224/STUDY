function solution(dartResult) {
    var answer = [];
    const arr = [];
    for (let i = 0; i < 3; i++) {
        const idx = /[SDT]/gi.exec(dartResult).index;
        if (/[*#]/g.test(dartResult[idx + 1])) {
            arr.push(dartResult.slice(0, idx + 2));
            dartResult = dartResult.slice(idx + 2);
        } else {
            arr.push(dartResult.slice(0, idx + 1));
            dartResult = dartResult.slice(idx + 1);
        }
    }
    arr.forEach((a, i) => {
        const idx = /[SDT]/gi.exec(a).index;
        let result = Number(a.slice(0, idx));
        switch (a[idx]) {
            case 'D':
                result = Math.pow(result, 2);
                break;
            case 'T':
                result = Math.pow(result, 3);
                break;
        }
        switch (a[idx + 1]) {
            case '*':
                if (i > 0) {
                    answer[i - 1] *= 2;
                }
                result *= 2;
                break;
            case '#':
                result *= -1;
        }
        answer.push(result);
    });
    return answer.reduce((acc, cur) => acc + cur);
}

console.log(solution('1S2D*3T')); // 37
console.log(solution('1D2S#10S')); // 9
console.log(solution('1D2S3T*')); // 59
