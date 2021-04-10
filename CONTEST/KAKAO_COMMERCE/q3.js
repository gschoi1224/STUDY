// 1부터 n까지 번호가 하나씩 붙어있는 n개의 역이 철로로 연결
// 철로는 양방향 통행 가능, 임의의 두 역을 직접 연결하는 철로는 최대 하나
// 서로 다른 두 역 사이의 이동 경로는 딱 한 가지 임의의 두 역 사이에 이동 불가능한 경우는 없음
// 출발역은 1번 전체 역중 한곳을 종착역으로
// 열차가 출발역에서 종착역까지 모든 역을 방문할 필요는 없으며 같은 역 두 번 방문 안 됨
// 종착역은 열차가 방문하는 역의 일일 이용객 수의 합이 최대가 되도록 지정
// 만약 일일 이용객 수의 합이 최대가 되는 역이 여러개라면 그중 번호가 큰 역을 선택
// 전체 역의 개수 n, 1번부터 n 역 까지의 일일 이용객 수 passenger, 역 사이의 철로 연결 정보 train이 매개변수
// 종착역으로 지정할 역 번호와 그때의 이용객 수 합을 순서대로 배열에 담아 return

const passenger = [2,1,2,2];    // 1번부터 n역 까지의 일일 이용객 수
const n = 6;    // 철도역의 개수
const train = [[1,2],[1,3],[2,4]];  // 역 사이의 철로 연결 정보

let answer = [1, passenger[0]]; // 종착역으로 지정할 역 번호, 그 때의 이용객 수 합
// 6, 3
let station = 1;
while (true) {
    let  passStation = [];
    train.map(t => {
        if (t[0] === station) {
            passStation.push([t[1], passenger[t[1] - 1]]);
        }
    });
    passStation.map(pass => {
        train.map(t => {
            if (pass[0] === t[0]) {
                pass.push(true);
            }
        });
    });

    const nextStation = passStation.filter(p => {
        if (p[2] === true) {
            return p;
        }
    });
    if (nextStation && nextStation.length > 0) {
        station = nextStation[0][0];
        answer[1] += nextStation[0][1];
    } else {
        answer[1] += passStation[0][1];
        console.log(passStation[0][1]);
        answer[0] = station;
        break;
    }
}

console.log(answer);