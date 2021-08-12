function solution(routes) {
    let answer = 0;
    routes.sort((a, b) => {
        return a[1] - b[1];
    });
    let cam = -30001;
    routes.forEach(r => {
        if (cam < r[0] || cam > r[1]) {
            // 카메라가 영역에서 벗어나면 도착지점에 하나 더 설치
            cam = r[1];
            answer++;
        }
    });
    return answer;
}

console.log(
    solution([
        [-20, 15],
        [-14, -5],
        [-18, -13],
        [-5, -3],
    ]),
); // 2
