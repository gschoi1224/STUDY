// ES8 문법
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function process() {
    console.log('안녕하세요!');
    await sleep(1000); // 1초 쉬고
    console.log('반값습니다!');
}

// 함수에서 async 를 사용하면 해당 함수는 결괏값으로 Prmise를 반환하게 됨
/*
process().then(() => {
    console.log('작업이 끝났어요!');
});
*/

async function makeError() {
    await sleep(1000);
    const error = new Error();
    throw error;
}

async function process2() {
    try {
        await makeError();
    } catch (e) {
        console.error(e);
    }
}

//process2();


const getDog = async() => {
    await sleep(1000);
    return '멍멍이';
};

const getRabbit = async() => {
    await sleep(500);
    return '토끼';
};

const getTurtle = async() => {
    await sleep(3000);
    return '거북이';
};

async function process3() {
    const dog = await getDog();
    console.log(dog);
    const rabbit = await getRabbit();
    console.log(rabbit);
    const turtle = await getTurtle();
    console.log(turtle);
}
// getDog -> getRabbit -> getTurtle 순으로 실행됨

//process3();

async function process4() {
    const result = await Promise.all([getDog(), getRabbit(), getTurtle()]); // 하나라도 실패하면 모두 실패한 것으로 간주됨
    console.log(result);
}

//process4();

async function process5() {
    const first = await Promise.race([
        getDog(),
        getRabbit(),
        getTurtle(),
    ]);
    console.log(first); // 가장 빨리 끝난 것의 값을 가져옴 다른 것들의 에러는 다 무시
    return new Promise((resolve, reject) => resolve('토끼가 출력됨 ㅅㄱ'));
};

process5().then(res => {
    console.log('!!!!' + res);
});