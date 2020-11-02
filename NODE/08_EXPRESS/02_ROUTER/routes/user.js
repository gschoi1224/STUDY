const express = require('express');

const router = express.Router();

// GET /user 라우터
/*
router.get('/' , (req, res) => {
    res.send('Hello, User');
});
*/

router.get('/', function(req, res, next) {
    next('route');  // 다음 미들웨어로 넘어가지 않고 다음 라우터로 넘어감
}, function(req, res, next) {
    console.log('실행되지 않습니다.');
    next();
}, function(req, res, next) {
    console.log('실행되지 않습니다.');
    next();
});
router.get('/', function(req, res) {
    console.log('실행됩니다.');
    res.send('Hello, Express');
});
// 하나의 주소의 라우터를 여러 개 만들어도 됨. 라우터가 몇 개든 간에 next()를 호출하면 다음 미들웨어가 실행됨.

router.get('/:id', function(req, res) {
    console.log(req.params, req.query);
});
// url의 /user/뒤에 오는 값을 id파라미터에 자동으로 넣어줌
// 와일드카드 역할을 하므로 모든 라우터들의 가장 뒤에 위치해야함
// http://localhost:3000/user/myId?start=1 일 경우 { id: 'myId' } { start: '1' }

router.get('/like', function(req, res) {
    console.log('실행되지 않음');
});

module.exports = router;