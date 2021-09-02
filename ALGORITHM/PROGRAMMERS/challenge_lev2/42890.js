function solution(relation) {
    var answer = [];
    const keys = new Array(relation[0].length).fill(0).map((_, i) => i);
    if (relation.length === 1) return keys.length;
    for (let i = 1; i <= keys.length; i++) {
        const combined = combination(keys, i);
        combined.forEach(c => {
            if (
                (!answer ||
                    !answer.filter(ans => ans.every(a => c.indexOf(a) > -1))
                        .length) &&
                isUnique(relation, c)
            )
                answer.push(c);
        });
    }
    return answer.length;
}

function combination(arr, num) {
    if (num === 1) return arr.map(a => [a]);
    const result = [];
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.slice(i + 1);
        const combined = combination(rest, num - 1);
        combined.forEach(c => {
            const rst = [fixed, ...c];
            result.push(rst.sort());
        });
    });
    return result;
}

function isUnique(relation, keys) {
    for (let i = 0; i < relation.length; i++) {
        for (let j = i + 1; j < relation.length; j++) {
            let sameCnt = 0;
            for (let key of keys) {
                if (relation[i][key] === relation[j][key]) sameCnt++;
            }
            if (sameCnt === keys.length) return false;
        }
    }
    return true;
}

console.log(
    solution([
        ['100', 'ryan', 'music', '2'],
        ['200', 'apeach', 'math', '2'],
        ['300', 'tube', 'computer', '3'],
        ['400', 'con', 'computer', '4'],
        ['500', 'muzi', 'music', '3'],
        ['600', 'apeach', 'music', '2'],
    ]),
);
// 2

console.log(
    solution([
        ['300', 'ryan', 'ccc', '1'],
        ['300', 'ryan', 'math', '1'],
        ['300', 'ryan', 'math', '3'],
        ['300', 'ryan', 'music', '4'],
        ['300', 'ryan', 'math', '1'],
        ['600', 'ryan', 'aaa', '5'],
    ]),
);

console.log(
    solution([
        ['a', 1, 'aaa', 'c', 'ng'],
        ['b', 1, 'bbb', 'c', 'g'],
        ['c', 1, 'aaa', 'd', 'ng'],
        ['d', 2, 'bbb', 'd', 'ng'],
    ]),
); // 3

console.log(
    solution([
        ['100', '100', 'ryan', 'music', '2'],
        ['200', '200', 'apeach', 'math', '2'],
        ['300', '300', 'tube', 'computer', '3'],
        ['400', '400', 'con', 'computer', '4'],
        ['500', '500', 'muzi', 'music', '3'],
        ['600', '600', 'apeach', 'music', '2'],
    ]),
); //3
