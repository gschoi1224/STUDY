const express = require('express');

const router = express.Router();    // app.js에서 app.get같은 메서드가 라우터 부분임. 라우터를 많이 연결하면 app.js 코드가 매우 길어지므로 익스프레스에서는 라우터를 분리할 수 있는 방법을 제공함.

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});

module.exports = router;
