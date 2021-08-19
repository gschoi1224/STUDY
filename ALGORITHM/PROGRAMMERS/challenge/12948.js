const solution = phone_number =>
    '*'.repeat(phone_number.length - 4) + phone_number.slice(-4);

console.log(solution('01033334444')); // "*******4444"
console.log(solution('027778888')); // "*****8888"
