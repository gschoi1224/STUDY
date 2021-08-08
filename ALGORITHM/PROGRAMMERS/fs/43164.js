function solution(tickets) {
    let answer = [];
    const result = [];
    const visited = [];

    tickets.sort();

    const len = tickets.length;
    const dfs = (str, count) => {
        console.log(str, count);
        result.push(str);
        if (count === len) {
            answer = result;
            return true;
        }
        for (let i = 0; i < len; i++) {
            if (!visited[i] && tickets[i][0] === str) {
                visited[i] = true;

                if (dfs(tickets[i][1], count + 1)) return true;

                visited[i] = false;
            }
        }
        return false;
    };
    dfs('ICN', 0);
    return answer;
}

console.log(
    solution([
        ['ICN', 'JFK'],
        ['HND', 'IAD'],
        ['JFK', 'HND'],
    ]),
); // ["ICN", "JFK", "HND", "IAD"]
console.log(
    solution([
        ['ICN', 'SFO'],
        ['ICN', 'ATL'],
        ['SFO', 'ATL'],
        ['ATL', 'ICN'],
        ['ATL', 'SFO'],
    ]),
); // ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

console.log(
    solution([
        ['ICN', 'B'],
        ['B', 'ICN'],
        ['ICN', 'A'],
        ['A', 'D'],
        ['D', 'A'],
    ]),
); // ["ICN", "B", "ICN", "A", "D", "A"]
