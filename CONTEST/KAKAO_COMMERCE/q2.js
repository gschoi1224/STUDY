const needs = [ [ 1, 0, 0 ], [1, 1, 0], [1, 1, 0], [1, 0, 1], [1, 1, 0], [0, 1, 1] ];   // needs[완제품의 번호][부품 번호] = 값이 1이면 부품이 필요함, 0이면 필요 없음
// const needs = [ [ 1, 0, 0 ], [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 1, 1] ];
const r = 2;    // 최대로 구매 가능한 로봇의 수

const compCnt = new Array(needs[0].length);
const buyRobot = [];

let answer = 0;
for (let i in needs) {
    for (let k in needs[i]) {
        if (needs[i][k] === 1) {
            compCnt[k] = compCnt[k] ? compCnt[k] + 1 : 1;
        }
    }
}
for (let i in compCnt) {
    
    if (buyRobot.length < r) {  
        buyRobot.push(parseInt(i));
    } else {
        let min;
        let minIndex;
        for (let k in buyRobot) {
            if (!min || min > compCnt[k]) {
                min = compCnt[k];
                minIndex = k;
            }
        }
        if (min < compCnt[i]) {
            buyRobot.splice(minIndex, 1, parseInt(i));
        }
    }
}
for (let i in needs) {
    let flag = true;
    for (let k = 0; k <needs[i].length ; k++) {
        if (needs[i][k] === 1 && !buyRobot.includes(k)) {
            flag = false;
            break;
        }
    }
    if (flag) answer++;
}

console.log(answer);