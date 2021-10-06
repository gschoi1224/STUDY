// 공통으로 들어가는 앞글자를 가장 길게 뽑아라

const longestCommonPrefix = strs => {
    let answer = '';
    for (let i = 0; i < Math.min(...strs.map(str => str.length)); i++) {
        const str = answer + strs[0][i];
        if (strs.some(s => !new RegExp('^' + str, 'gi').test(s))) {
            return answer;
        } else {
            answer = str;
        }
    }
    return answer;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); //  "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ""

/*
시간복잡도 개선
var longestCommonPrefix = function(strs) {
    let sub=strs[0]
    let i=1
    
    while(i<strs.length && sub.length>0){
        if(!strs[i].startsWith(sub)){
            sub = sub.slice(0,sub.length-1)
            i--
        }
        i++
    }
    console.log(sub);
    return(sub);
};
*/
