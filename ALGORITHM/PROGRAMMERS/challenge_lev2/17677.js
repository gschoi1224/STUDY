function solution(str1, str2) {
    const obj1 = {};
    const obj2 = {};
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();
    const arr1 = [];
    const arr2 = [];

    for (let i = 0; i < str1.length - 1; i++) {
        const temp = str1.slice(i, i + 2);
        if (/[^A-Z]/gi.test(temp)) {
            continue;
        }
        arr1.push(temp);
    }
    for (let i = 0; i < str2.length - 1; i++) {
        const temp = str2.slice(i, i + 2);
        if (/[^A-Z]/gi.test(temp)) {
            continue;
        }
        arr2.push(temp);
    }
    arr1.sort();
    arr2.sort();

    // 합집합
    const sum = [];
    // 교집합
    const sub = [];

    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) > -1) {
            sub.push(...arr1.splice(arr1.indexOf(arr2[i]), 1));
        }
        sum.push(arr2[i]);
    }

    for (let a of arr1) {
        sum.push(a);
    }

    if (!sum.length && !sub.length) return 65536;
    if (!sum.length) return 0;
    return parseInt((sub.length / sum.length) * 65536);
}

console.log(solution('FRANCE', 'french')); // 16384
console.log(solution('handshake', 'shake hands')); //65536
console.log(solution('aa1+aa2', 'AAAA12')); // 43690
console.log(solution('E=M*C^2', 'e=m*c^2')); // 65536
