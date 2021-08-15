const solution = (a, b) =>
    ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
        new Date(2016, a - 1, b + 1).getDay()
    ];

console.log(solution(5, 24)); // "TUE"
console.log(solution(1, 1)); // "FRI"
console.log(solution(1, 2)); // "SAT"
