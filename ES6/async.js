// ES2017 이후부터 지원
async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender : 'm'});
    // 생략
}

/*
function -> async function
프로미스 앞에 await 붙임
해당 프로미스가 resolve 될 때까지 기다린 뒤 다음 로직으로 넘어감
await Users.findOne({})이 resolve 될 때까지 기다린 다음에 user 변수를 초기화함
*/