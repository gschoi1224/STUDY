// 구버전
var candyMachine1 = {
    status : {
        name : 'node',
        count : 5,
    },
    getCandy : function() {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy1 = candyMachine1.getCandy();
var count1 = candyMachine1.status.count;

//console.log(getCandy1); // 4
//console.log(count1); // 4

// ES6+
const candyMachine2 = {
    status : {
        name : 'node',
        count : 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    },
};
const {getCandy, status : {count}} = candyMachine2;
// 이렇게 쓰면 알아서 candyMachine 객체 안의 속성을 찾아서 변수와 매칭함 (getCandy : 없이 쓰려면 이름이 같아야함)
//console.log(count);

// 구버전
var array = ['node.js', {}, 10, true];
var node1 = array[0];
var obj1 = array[1];
var bool1 = array[3];
var str1 = `node=${node1}, obj=${obj1}, bool=${bool1}`;
console.log(str1);

// ES6+
const [node2, obj2, , bool2] = array;
// 순서를 잘 맞춰서 각각 배정해줌
var str2 = `node=${node2}, obj=${obj2}, bool=${bool2}`;
console.log(str2);