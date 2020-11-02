const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

const indexRouter = require('./routes');    // index.js 생략 가능
const userRouter = require('./routes/user');

app.use(session({ 
    resave : false,
    saveUninitialized : false, 
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie',
}));

app.use('/', indexRouter);   
app.use('/user', userRouter);   // use의 /user와 get의 /가 합쳐져서 GET /user 라우터가 됨

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})
