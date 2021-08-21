function solution(cacheSize, cities) {
    var answer = 0;
    const cache = new Array(cacheSize).fill({ city: null, used: -1 });
    cities.forEach((city, i) => {
        city = city.toLowerCase();
        let isUsed = false;
        for (let j = 0; j < cacheSize; j++) {
            if (cache[j].city === city) {
                isUsed = true;
                cache[j].used = i;
                answer++;
                break;
            }
        }
        if (!isUsed) {
            for (let j = 0; j < cacheSize; j++) {
                if (cache[j].city === city) {
                    cache[j] = { city, used: i };
                    isUsed = true;
                    answer += 5;
                    break;
                }
            }
        }
        if (!isUsed) {
            answer += 5;
            let min = Infinity;
            let minIdx = -1;
            for (let j = 0; j < cacheSize; j++) {
                if (min > cache[j].used) {
                    min = cache[j].used;
                    minIdx = j;
                }
            }
            cache[minIdx] = { city, used: i };
        }
    });

    return answer;
}

console.log(
    solution(3, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
    ]),
); // 50
console.log(
    solution(3, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'Jeju',
        'Pangyo',
        'Seoul',
        'Jeju',
        'Pangyo',
        'Seoul',
    ]),
); // 21
console.log(
    solution(2, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'SanFrancisco',
        'Seoul',
        'Rome',
        'Paris',
        'Jeju',
        'NewYork',
        'Rome',
    ]),
); // 60

console.log(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork'])); // 16
