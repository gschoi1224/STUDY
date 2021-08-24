function solution(s) {
    const answer = new Set();
    s.split(/[{}]/g)
        .map(a => a.split(','))
        .filter(a => a.join('').length > 0)
        .sort((a, b) => a.length - b.length)
        .forEach(st => {
            st.forEach(str => {
                answer.add(Number(str));
            });
        });
    return [...answer];
}
console.log(solution('{{2},{2,1},{2,1,3},{2,1,3,4}}')); // [2,1,3,4]
console.log(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}')); // [2,1,3,4]
