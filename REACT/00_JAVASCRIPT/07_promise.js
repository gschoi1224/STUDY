// 콜백 지옥!!!!
/*
function increaseAndPrint(n, callback) {
    setTimeout(() => {
        const increased = n + 1;
        console.log(increased);
        if (callback) {
            callback(increased);
        }
    }, 1000);
}

increaseAndPrint(0, n => {
    increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
            increaseAndPrint(n, n => {
                increaseAndPrint(n, n => {
                    console.log('끝!');
                });
            });
        });
    });
});
*/
// Promise 만들기♡
/*
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1); // resolve를 호출할 때 특정 값을 파라미터로 넣어주면 이 값을 작업이 끝나고 나서 사용 할 수 있소
    }, 1000);
});

myPromise.then(n => {
    console.log(n);
});
*/

function increaseAndPrint2(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = n + 1;
            if (value === 5) {
                const error = new Error();
                error.name = 'ValueIsFiveError';
                reject(error);
                return;
            }
            console.log(value);
            resolve(value);
        });
    })
}

increaseAndPrint2(0).then((n) => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).then(n => {
    return increaseAndPrint2(n);
}).catch(err => {
    console.error(err);
});