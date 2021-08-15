const solution = (n, arr1, arr2) => {
    arr1 = arr1.map(a => a.toString(2).padStart(n, '0').split(''));
    arr2 = arr2.map(a => a.toString(2).padStart(n, '0').split(''));
    return new Array(n).fill(0).map((_, i) =>
        new Array(n)
            .fill(0)
            .map((_, k) =>
                arr1[i][k] === '1' || arr2[i][k] === '1' ? '#' : ' ',
            )
            .join(''),
    );
};

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28])); //["#####","# # #", "### #", "# ##", "#####"]
console.log(solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10])); //["######", "### #", "## ##", " #### ", " #####", "### # "]
