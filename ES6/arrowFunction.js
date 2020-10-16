function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

// 함수 내부에 return문 밖에 없는 경우에는 생략 가능
const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
    return !x;
}

// 매개변수가 한개면 소괄호로 묶지 않아도 됨
const not2 = x => !x;

// this 바인드 방식의 차이
var relationship1 = {
    name : 'zero',
    friends : ['nero', 'hero', 'xero'],
    logFriends : function() { // 각자 다른 함수 스코프를 가지고 있으므로 this를 통해 relationship에 접근 못함
        var that = this; // relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function (friend) { 
            console.log(that.name, friend);
        });
    }
}
relationship1.logFriends();
// zero nero
// zero hero
// zero xero

const relationship2 = {
    name : 'zero',
    friends : ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => { //화살표 함수를 사용하면 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있음
            console.log(this.name, friend);
        });
    }
}
relationship2.logFriends();
// zero nero
// zero hero
// zero xero

