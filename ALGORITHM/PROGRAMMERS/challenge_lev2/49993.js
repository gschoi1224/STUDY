function solution(skill, skill_trees) {
    var answer = 0;
    const indegree = {};
    skill.split('').forEach((s, i) => {
        indegree[s] = [...skill.slice(0, i)];
    });
    skill_trees.forEach(st => {
        let isPossible = true;
        for (let i = 0; i < st.length; i++) {
            const s = st[i];
            if (
                indegree[s] &&
                indegree[s].filter(a => st.slice(0, i).indexOf(a) === -1).length
            ) {
                isPossible = false;
            }
        }
        if (isPossible) answer++;
    });
    return answer;
}

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA'])); // 2
