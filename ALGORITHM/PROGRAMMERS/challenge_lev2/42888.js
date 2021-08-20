function solution(record) {
    const comment = { Enter: '님이 들어왔습니다.', Leave: '님이 나갔습니다.' };
    const nickname = {};
    record.forEach(r => {
        const [message, id, nick] = r.split(' ');
        if (message === 'Change' || message === 'Enter') {
            nickname[id] = nick;
        }
    });
    record = record.map(r => r.split(' ')).filter(r => r[0] !== 'Change');
    return record.map(r => `${nickname[r[1]]}${comment[r[0]]}`);
}
console.log(
    solution([
        'Enter uid1234 Muzi',
        'Enter uid4567 Prodo',
        'Leave uid1234',
        'Enter uid1234 Prodo',
        'Change uid4567 Ryan',
    ]),
);
//  ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
