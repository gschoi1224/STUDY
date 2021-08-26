var twoSum = function (numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];
        }
    }
    return [0, 0];
};

console.log(twoSum([2, 7, 11, 15], 9)); // [1,2]
console.log(twoSum([2, 3, 4], 6)); // [1, 3]
console.log(twoSum([-1, 0], -1)); // [1, 2]

// Wrong Answer
console.log(twoSum([0, 0, 3, 4], 0)); // [1, 2]

/**
 * Runtime: 322 ms, faster than 10.37% of JavaScript online submissions for Two Sum II - Input array is sorted.
 * Memory Usage: 39.3 MB, less than 40.79% of JavaScript online submissions for Two Sum II - Input array is sorted.
 * Next challenges:
 */
