// async & await 콜백함수와 프로미스이 단점을 보완하고 읽기 좋은 코드를 작성하게 도와줌
// 기본 문법
async function funName() { // async 예약어 
    await methodName(); // HTTP통신을 하는 비동기 처리 코드 앞에 await을 붙임, 이 비동기 메서드가 꼭 프로미스 객체를 반환해야함
}

// 예제
function fetchItems() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var items = [1,2,3];
            resolve(items);
        }, 1000);
    });
}
async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems);
}

logItems();

// async & await 의 예외 처리
async function logTodoTitle() {
    try {
        const user = await fetchUser();
        if (user.id === 1) {
            var todo = await fetchTodo();
            console.log(todo.titld);
        }
    } catch (err) {
        console.error(err);
    }
}