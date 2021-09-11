function solution(table, languages, preference) {
    let MAX = 0;
    let company = [];
    const lang = [
        'JAVA',
        'JAVASCRIPT',
        'C',
        'C++',
        'C#',
        'SQL',
        'PYTHON',
        'KOTLIN',
        'PHP',
    ];
    table = table.map(t => {
        const arr = t.split(' ');
        const score = new Array(lang.length).fill(0);
        arr.slice(1)
            .reverse()
            .forEach((a, i) => {
                score[lang.indexOf(a)] = i + 1;
            });
        let total = 0;
        for (let i = 0; i < languages.length; i++) {
            total += score[lang.indexOf(languages[i])] * preference[i];
        }
        if (total > MAX) {
            MAX = total;
            company = [arr[0]];
        } else if (total === MAX) {
            company.push(arr[0]);
        }
        return score;
    });
    company.sort();
    return company[0];
}

console.log(
    solution(
        [
            'SI JAVA JAVASCRIPT SQL PYTHON C#',
            'CONTENTS JAVASCRIPT JAVA PYTHON SQL C++',
            'HARDWARE C C++ PYTHON JAVA JAVASCRIPT',
            'PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP',
            'GAME C++ C# JAVASCRIPT C JAVA',
        ],
        ['PYTHON', 'C++', 'SQL'],
        [7, 5, 5],
    ),
); // "HARDWARE"
console.log(
    solution(
        [
            'SI JAVA JAVASCRIPT SQL PYTHON C#',
            'CONTENTS JAVASCRIPT JAVA PYTHON SQL C++',
            'HARDWARE C C++ PYTHON JAVA JAVASCRIPT',
            'PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP',
            'GAME C++ C# JAVASCRIPT C JAVA',
        ],
        ['JAVA', 'JAVASCRIPT'],
        [7, 5],
    ),
); // 	"PORTAL"
