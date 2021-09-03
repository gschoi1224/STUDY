function solution(m, musicinfos) {
    let answer = new Music();
    m = ',' + m.match(/[A-G]#?/gi).join(',') + ',';
    musicinfos = musicinfos.map((info, i) => {
        const arr = info.split(',');
        const music = new Music();
        music.setPlayTime(arr[0], arr[1]);
        music.setOrder(i);
        music.setTitle(arr[2]);
        music.setMelody(arr[3]);
        if (music.melody.indexOf(m) > -1) {
            if (!answer.title || answer.playTime < music.playTime) {
                answer = music;
            }
        }
        return music;
    });
    return answer.title ? answer.title : '(None)';
}
class Music {
    playTime = 0;
    melody = '';
    title = '';
    order = 0;
    setTitle(title) {
        this.title = title;
    }
    setMelody(melody) {
        const arr = melody.match(/[A-G]#?/gi);
        let i = 0;
        while (arr.length < this.playTime) {
            arr.push(arr[i++]);
        }
        this.melody = ',' + arr.slice(0, this.playTime).join(',') + ',';
    }
    setOrder(order) {
        this.order = order;
    }

    setPlayTime(start, end) {
        const startHour = Number(start.split(':')[0]);
        const startMinute = Number(start.split(':')[1]);
        let endHour =
            Number(end.split(':')[0]) >= 24 ||
            Number(end.split(':')[0]) === 0 ||
            Number(end.split(':').join('')) < Number(start.split(':').join(''))
                ? 24
                : Number(end.split(':')[0]);
        const endMinute =
            Number(end.split(':')[0]) >= 24 ||
            Number(end.split(':')[0]) === 0 ||
            Number(end.split(':').join('')) < Number(start.split(':').join(''))
                ? 0
                : Number(end.split(':')[1]);
        let playTime = 0;
        if (startMinute > endMinute) {
            playTime += endMinute - startMinute + 60;
            endHour--;
        } else {
            playTime += endMinute - startMinute;
        }
        playTime += (endHour - startHour) * 60;
        this.playTime = playTime;
    }
}
console.log(
    solution('ABCDEFG', [
        '12:00,12:14,HELLO,CDEFGAB',
        '13:00,13:05,WORLD,ABCDEF',
    ]),
); // "HELLO"
console.log(
    solution('CC#BCC#BCC#BCC#B', [
        '03:00,03:30,FOO,CC#B',
        '04:00,04:08,BAR,CC#BCC#BCC#B',
    ]),
); // "FOO"
console.log(
    solution('ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']),
); // "WORLD"

console.log(
    solution('AB#C#DE', [
        '23:55,03:55,AAA,AB#C#DD',
        '23:11,04:33,BBB,DEBAB#C#DEAB',
    ]),
); // BBB
