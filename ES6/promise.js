// Es5 부터는 API들이 콜백 대신 프로미스 기반으로 재구성됨
const condition = true; // true면 resolve, false reject
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("성공");
    }
    else {
        reject("실패");
    }
});
// 다른 코드가 들어갈 수 있음
promise
.then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
})
.catch((error) => {
    console.error(error); // 실패(reject)한 경우 실행
})
.finally(() => {
    console.log("무조건");
});
/*
프로미스 내부에서 resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행됨. finally 부분은 무조건 실행됨
즉 resolve('성공')이 호출되면 then의 message가 '성공'이 되고 reject('실패')가 호출되면 catch의 error가 '실패'가 되는 것임
프로미스는 실행은 바로 하되 결과값은 나중에 받는 객체. 결과는 실행이 완료된 후 then이나 catch 메서드를 통해 받음 
*/

promise
.then((message) => {
    return new Promise((resolve, reject) => {
        resolve(message);
    })
})
.then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
        resolve(message2);
    });
})
.then((message3) => {
    console.log(message3);
})
.catch((error) => {
    console.log(error);
});

// then에서 new Promise를 return하면 다음 then에서 다시 받을 수 있음

// 콜백함수
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => { // 첫 번째 콜백
        if (err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.svae((err) => { // 두 번째 콜백
            if (err) {
                return console.error(err);
            }
            Users.findOne({gender : 'm'}, (err, user) => { // 세 번째 콜백
                // 생략
            });
        });
    });
}

// 프로미스 (findOne과 save함수 내부에 new Promise가 구현되어 이었야 함)
function findAndSaveUser2(Users) {
    Users.findOne({})
    .then((user) => {
        user.name = 'Zero';
        return user.save();
    })
    .then((user) => {
        return Users.findOne({gender : 'm'});
    })
    .then((user) => {
        //생략
    })
    .catch(err => {
        console.error(err);
    });
}

// 프로미스를 한 번에 여러 개 실행하는 방법
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
.then((result) => {
    console.log(result);    // ["성공1", "성공2"]
})
.catch((error) => {
    console.error(error);
});