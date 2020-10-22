const odd = '홀수입니다';
const even = "짝수입니다";

module.exports = {
    odd,
    even,
};
/*
    exports.odd = '홀수입니다';
    exports.even = '짝수입니다';
    와 동일하게 실행됨

    exports와 module.exports는 같은 객체를 참조함
    console.log(module.exports === exports)를 하면 true가 나옴
    exports -(참조)-> module.exports -(참조)-> {}

    ⨳ exports 객체를 사용할 때는 module.exports와의 참조 관계가 깨지지 않도록 주의해야함
    module.exports에는 어떤 값이든 대입 되지만, exports에는 반드시 속성명과 속성값을 대입해야함 
    exports에 다른 값을 대입하면 객체의 참조 관계가 끊김
    exports는 객체만 사용할 수 있음 (함수 불가)
    한 모듈에 둘을 동시에 사용하지 않도록 주의
*/