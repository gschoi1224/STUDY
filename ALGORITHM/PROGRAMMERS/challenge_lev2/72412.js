function solution(info, query) {
    var answer = [];
    info = info.map(i => i.split(' '));
    query.forEach(q => {
        const arr = q
            .split(/ and /gi)
            .map(a => a.split(' '))
            .flat();
        answer.push(info.filter(applicant => check(applicant, arr)).length);
    });
    return answer;
}
const check = (info, query) => {
    for (let i = 0; i < 4; i++) {
        if (query[i] !== '-' && query[i] !== info[i]) {
            return false;
        }
    }
    if (Number(query[4]) > Number(info[4])) {
        return false;
    }
    return true;
};
console.log(
    solution(
        [
            'java backend junior pizza 150',
            'python frontend senior chicken 210',
            'python frontend senior chicken 150',
            'cpp backend senior pizza 260',
            'java backend junior chicken 80',
            'python backend senior chicken 50',
        ],
        [
            'java and backend and junior and pizza 100',
            'python and frontend and senior and chicken 200',
            'cpp and - and senior and pizza 250',
            '- and backend and senior and - 150',
            '- and - and - and chicken 100',
            '- and - and - and - 150',
        ],
    ),
);
// [1,1,1,1,2,4]
