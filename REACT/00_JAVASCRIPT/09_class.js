// 클래스를 만드는 세 가지 방법
// 1) 리터럴 방식
const instance1 = {
    property1: 'default',
    property2: 'default',

    method1: function() {
        return null;
    },
    method2: function() {
        return null;
    },
};

// 2) 함수 방식의 클래스
function className() {
    (this.property1 = 'default'),
    (this.property2 = 'default'),
    (this.method1 = function() {
        return null;
    });
    this.method2 = function() {
        return null;
    };
}

const instance2 = new className();

// 3) 프로토타입 방식의 클래스
function className2() {
    this.property1 = 'default';
    this.property2 = 'default';
}

className2.prototype.method1 = function() {
    return null;
};
className2.prototype.method2 = function() {
    return null;
};