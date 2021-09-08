const solution = numbers =>
    numbers.map(num => {
        const binary = '0' + num.toString(2);
        if (num % 2 === 0) {
            return parseInt(binary.slice(0, -1) + '1', 2);
        } else {
            for (let i = binary.length - 1; i >= 0; i--) {
                if (binary[i] === '0') {
                    return parseInt(
                        binary.slice(0, i) + '10' + binary.slice(i + 2),
                        2,
                    );
                }
            }
        }
    });
console.log(solution([2, 7])); //	[3,11]
