function solution(genres, plays) {
    const objs = [];
    const sum = {};
    const count = {};
    for (let i = 0; i < genres.length; i++) {
        sum[genres[i]] = (sum[genres[i]] || 0) + plays[i];
        objs.push({ genre: genres[i], play: plays[i], num: i });
    }
    objs.sort((a, b) => {
        if (sum[a['genre']] !== sum[b['genre']]) {
            return sum[b['genre']] - sum[a['genre']];
        } else {
            if (a['play'] !== b['play']) {
                return b['play'] - a['play'];
            } else {
                return b['num'] - a['num'];
            }
        }
    });
    const answer = objs.map(o => {
        if (!count[o['genre']] || count[o['genre']] < 2) {
            count[o['genre']] = (count[o['genre']] || 0) + 1;
            return o['num'];
        }
    });
    return answer.filter(a => a >= 0);
}

console.log(
    solution(
        ['classic', 'pop', 'classic', 'classic', 'pop'],
        [500, 600, 150, 800, 2500],
    ),
); // [4, 1, 3, 0]
