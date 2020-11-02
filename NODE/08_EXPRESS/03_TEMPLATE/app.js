// > npm init --y
// > npm i express nodemon express-session pug dotenv

const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

dotenv.config();
const app = new express();

app.set('port', process.env.PORT || 3000);
/*  퍼그 연결법
// app.set('views', path.join(__dirname, 'views'));    // 템플릿 파일들이 위치한 폴더를 지정. res.render 메서드가 이 폴더를 기준으로 템플릿 엔진을 찾아서 렌더링함
// res.render('index')라면 views/index.pug를 렌더링함
// app.set('view engine', 'pug');  // 어떠한 종류의 템플릿 엔진을 사용할지를 나타냄.
*/

// 넌적스 연결법
app.set('view engine', 'html');     // html을 그대로 사용해도 되지만 넌적스임을 구분하려면 njk를 쓰면 됨. 단, 이때는 view engine도 njk로 바꿔야 함.

nunjucks.configure('views', {   // views 폴더의 경로, 옵션
    express : app, 
    watch : true // true 이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링 함.
})

app.use(morgan('dev'));



app.get('/', (req, res, next) => {
    console.log('GET / ');
    res.locals.myName = 'CGS';
    res.render('index', {title : 'Express'});
    next();
});

app.use((req, res, next) => {   
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'prodution' ? err : {}; // 에러 객체의 스택 트레이스는 시스템 환경이 production(배포 환경)이 아닌 경우에만 표시됨. 배포 환경인 경우에는 에러 메시지만 표시됨.
    res.status(err.status || 500);
    res.render('error');
});

// 만약 404 에러가 발생한다면 res.locals.message는 `${req.method} ${req.url} 라우터가 없습니다.` 가 됨. next(error)에서 넘겨준 인수가 에러 처리 미들웨어의 err로 연결되기 때문.
// 에러 처리 미들웨어는 error라는 템플릿 파일(넌적스이므로 error.html파일)을 렌더링함. 

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 서버 대기 중!');
});