function solution(orders, course) {
    const answer = new Array(course.length).fill(0).map(_ => []);
    orders.forEach(order => {
        for (let i = 0; i < course.length; i++) {
            const result = combination([...order].sort(), course[i]);
            result.forEach(r => {
                const temp = r.join('');
                if (answer[i][temp]) answer[i][temp]++;
                else answer[i][temp] = 1;
            });
        }
    });
    return answer
        .map(arr => {
            let result = [];
            let max = 2;
            for (let menu in arr) {
                if (arr[menu] > max) {
                    result = [menu];
                    max = arr[menu];
                } else if (arr[menu] === max) {
                    result.push(menu);
                }
            }
            return result;
        })
        .flat()
        .sort();
}

const combination = (arr, num) => {
    if (num === 1) return arr.map(a => [a]);
    const result = [];
    arr.forEach((a, i) => {
        const fixed = a;
        const rest = arr.slice(i + 1);
        const combined = combination(rest, num - 1);
        combined.forEach(c => {
            result.push([fixed, ...c]);
        });
    });
    return result;
};

console.log(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]),
); // ["AC", "ACDE", "BCFG", "CDE"]
console.log(
    solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]),
); // ["ACD", "AD", "ADE", "CD", "XYZ"]
console.log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4])); // 	["WX", "XY"]
