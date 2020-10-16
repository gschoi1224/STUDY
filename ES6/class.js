// 프로토타입 기반 문법을 보기 좋게 클래스로 바꾼 것
var Human = function(type) {
    this.type = type || 'human';    // type이 들어오지 않는다면 undefined가 되고 이건 false로 판단되어 뒤의 값인 'human'이 기본으로 반환됨
}

/*
3 || 4 -> 3
n1 || 8 -> true
false || 4 -> 4
0 || 9 -> 9
*/
Human.isHuman = function (human) {
    return human instanceof Human;  // instanceof 연산자는 생성자의 prototype 속성이 객체의 포로토타입 체인 어딘가에 존재하는지 판별함
}

Human.prototype.breathe = function() {
    alert('h-a-a-a-m');
}

var Zero = function (type, firstName, lastName) {
    Human.apply(this, arguments); // arguments : { '0': 'human', '1': 'Zero', '2': 'Cho' }
    this.firstName = firstName;
    this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // 상속하는 부분
Zero.prototype.sayName = function() {
    alert(tihs.firstName + ' ' + this.lastName);
}

var oldZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(oldZero)); // true


// ES6+
class Human2 {
    constructor (type = 'human') {
        this.type = type;
    }
    static isHuman(human) {
        return human instanceof Human;
    }

    breath() {
        alert('h-a-a-a-m');
    }
}

class Zero extends Human {
    constructor (type, firstName, lastName) {
        super(type);
        this.firstName = firstNmae;
        this.lastName = lastName;
    }

    sayName() {
        super.breath();
        alert(`${this.firstName} ${this.lastName}}`);
    }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero); // true
