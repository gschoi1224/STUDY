// 소수의 개수를 구하는 작업
// 2부터 1,000까지의 숫자 중의 소수가 모두 몇 개 있는지를 알아내는 코드
// 개수 : 168
// prime: 15.584s

const min = 2;
const max = 1000;
let prime = 0;
let primes = new Array();

console.time('prime');
for (let i = min ; i <= max ; i++) {
    let isPrime = false;
    for (let j = 1 ; j <= i; j++) {
        console.log(`${i} % ${j} : ${i % j}`);
        if (i % j === 0 && i !== j && j !== 1) {
            isPrime = false;
            break;
        } else {
            isPrime = true;
        }
    }
    if (isPrime) {
        prime++;
        primes.push(i);
    }
}
console.log(primes);
console.log('개수 :', prime);
console.timeEnd('prime');