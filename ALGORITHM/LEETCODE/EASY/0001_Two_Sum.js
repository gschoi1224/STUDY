/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (let x = 0; x < nums.length; x++) {
        for (let y = x + 1; y < nums.length; y++) {
            if (nums[x] + nums[y] === target) {
                return [x, y];
            }
        }
    }
    return [0, 0];
};

/**
 * Runtime: 108 ms, faster than 46.04% of JavaScript online submissions for Two Sum.
 * Memory Usage: 39.8 MB, less than 57.63% of JavaScript online submissions for Two Sum.
 */
