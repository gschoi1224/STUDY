const express = require('express');
const path = require('path');
const { runInNewContext } = require('vm');

// npm i morgan cookie-parser express-session dotenv
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');     // 세션 관리용 미들웨어. 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 유용함. 세션은 사용자별로 req.session 객체 안에 유지됨
const dotenv = require('dotenv');   // .env 파일을 읽어서 process.env로 만듦. process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 때문
const { urlencoded } = require('express');

// > npm i multer
const multer = require('multer');   // 이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드 할 때 사용하는 미들웨어

const upload = multer({
    storage : multer.diskStorage({  // 어디에(destination) 어떤 이름으로(filename) 저장할지
        destination(req, file, done) {  // req(요청에 대한 정보), file(업로드한 파일에 대한 정보), done(함수)
            done(null, 'uploads/'); // 에러가 있다면 에러를 넣고, 두 번째 인수에는 실제 경로나 파일 이름을 넣기
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // [파일명 + 현재시간.확장자]
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},  // 업로드에 대한 제한 사항 설정, 파일 사이즈(바이트 단위)
});

// 위 설정을 실제로 활용하기 위해 서버에 upload 폴더가 꼭 존재해야함. 없다면 직접 만들어주거나 fs 모듈을 사용해 서버를 시작할 때 생성
const fs = require('fs');
try {
    fs.readdirSync('uploads'); 
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// 파일을 하나만 업로드하는 경우(multipart.html과 같은 경우)에는 single 미들웨어를 사용함
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});
// single 미들웨어를 라우터 미들웨어 앞에 넣어두면 multer 설정에 따라 파일 업로드 후 req.file 객체가 생성됨. 인수는 input 태그의 name이나 폼 데이터의 키와 일치하게 넣으면 됨
// 업로드 성공 시 결과는 req.file 객체 안에 들어 있음. req.body는 파일이 아닌 데이터인 title이 들어 있음.

// 여러 파일을 업로드하는 경우 (<input type='file' name='many' multiple/>)
app.post('/upload', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});
// 업로드 결과도 req.file 대신 req.files 배열에 들어감

// 여러 파일을 업로드하는 경우 (input 태그나 폼 데이터의 키가 다른 경우) : fields 미들웨어 사용
app.post('/upload', 
    upload.fields([{ name:'image1'}, {name : 'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);
// 업로드 결과도 req.files.image1, req.files.image2에 각각 들어있음

// 파일을 업로드하지 않고도 멀티파트 형식으로 업로드하는 경우 
app.post('/upload', upload.none(), (req, res) => {
    console.log(req.body);
    res.send('ok');
});
// 파일을 업로드하지 않았으므로 req.body만 존재함.

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);  // 서버가 실행될 포트 설정. process.env 객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 3000번 포트를 이용

app.use(morgan('dev')); // 요청과 응답에 대한 정보를 콘솔에 기록, 인수로 dev 외에 combined, common, short, tiny 등을 넣을 수 있음. 인수를 바꾸면 로그가 달라짐
app.use('/', express.static(path.join(__dirname, 'public')));    // static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 함. 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 됨. 
app.use(express.json());    // body-parser : 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어. 보통 폼 데이터나 ajax 요청의 데이터를 처리함. 
                            // expree 4.16.0 버전부터 body-parser 미들웨어의 일부 기능이 익스프레스에 내장되었으므로 따로 설치할 필요가 없음
                            // 단, Text(텍스트 데이터)나 Raw(버퍼 데이터)의 경우는 body-parserr를 설치해야함
app.use(express.urlencoded({ extended : false})); // 주소 형식으로 데이터를 보내는 방식, extended 옵션 : false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, true면 qs 모듈을 사용해 쿼리스트링을 해석함
app.use(cookieParser(process.env.COOKIE_SECRET));   // cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦. 유효기간이 지난 쿠키는 알아서 걸러냄
                                                    // 첫 번째 인수로 비밀 키를 넣어줄 수 있음. 쿠키는 클라이언트에서 위조하기 쉬우므로 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙임. 서명된 쿠키는 req.signedCookies 객체에 담김.
/*
    res.cookie('name', 'CGS', { // res.cookie(키, 값, 옵션) 형식으로 쿠키를 만들 수 있음
        expires : new Date(Date.now() + 900000),
        httpOnly : true,
        secure : true,
    });
    res.clearCookie('name', 'CGS', { httpOnly : true, secure : true });  // 쿠키를 지우려면 키와 값 외에 옵션도 정확히 일치해야 함(expires, maxAge 제외). signed를 true로 설정하면 쿠키 뒤에 서명이 붙음
*/

/*
app.use(
    morgan('dev'),
    express.static('/', path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended : false }),
    cookieParser(process.env.COOKIE_SECRET),
);
// 여러 개의 미들웨어 장착 가능. 다음 미들웨어로 넘어가려면 next 함수를 호출해야 하지만 위 미들웨어들은 내부적으로 next를 호출하고 있으므로 연달아 쓰기 가능
// 미들웨어는 res.send나 res.sendFile등의 메서드로 응답을 보내야 함. express.static과 같은 미들웨어는 정적 파일을 제공할 때 next대신 res.sendFile 메서드로 응답을 보냄
// 따라서 정적 파일을 제공하는 경우 express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않음. 순서에 따라 실행되지 않는 미들웨어도 있다는것 알아두기
*/

app.use(session({   // express-session 1.5 버전 이전에는 내부적으로 cookie-parser를 사용하고 있어서 cookie-parser 미들웨어보다 뒤에 위치해야 했지만, 1.5부터는 상관없어짐
    resave : false,     // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것
    saveUninitialized : false,  // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것
    secret : process.env.COOKIE_SECRET, // express-session은 세션 관리 시 클라이언트에 쿠키를 보냄. 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고 쿠키를 서명하는 데 secret의 값이 필요함
                                        // cookie-parser의 secret과 같게 설정하는 것이 좋음
    cookie : {  // 세션 쿠키에 대한 설정. 
        httpOnly : true,    // 클라이언트에서 쿠키를 확인하지 못함
        secure : false, // https가 아닌 환경에서도 사용 가능
    },
    name : 'session-cookie',
}));

/*
    req.session.name = 'CGS';   // 세션 등록
    req.sessionID;  // 세션 아이디 확인
    req.session.destroy();  // 세션 모두 제거

    express-session에서 서명한 쿠키 앞에는 s:이 붙음. 실제로는 encodeURIComponent 함수가 실행되어 s%3A가 됨.
*/

// 미들웨어
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next(); //다음 미들웨어로 넘어가는 함수
});
// next() : 다음 미들웨어로
// next('route') : 다음 라우터로
// next('error) : 에러 핸들러로

/*
    app.use((req, res, next) => {
        req.data = '데이터 넣기';
        next();
    }, (req, res, next) => {
        console.log(req.data);  // 데이터 받기
        next();
    });
    현재 요청이 처리되는 동안 req.data를 통해 미들웨어 간에 데이터를 공유할 수 있음. 
    새로운 요청이 오면 req.data는 초기화됨. 속성명이 꼭 data일 필요는 없지만 다른 미들웨어와 겹치지 않게 조심해야 함.

    app.set과의 차이
    app.set을 사용하면 app.get 또는 req.app.get으로 어디서든지 데이터를 가져올 수 있지만 app.set을 사용하지 않고 req 객체에 데이터를 넣어서 다음 미들웨어로 전달하는 이유는 
    app.set은 익스프레스에서 전역적으로 사용되므로 사용자 개개인의 값을 넣기에는 부적절하며, 앱 전체의 섲렁을 공유할 때 사용하면 됨.
    req 객체는 요청을 보낸 사용자 개개인에게 귀속되므로 req 객체를 통해 개인의 데이터를 전달하는 것이 좋음
*/

/*
    app.use(미들웨어) : 모든 요청에서 미들웨어 실행
    app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
    app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
*/

app.get('/', (req, res, next) => {
    // res.send('Hello, Express'); // 단순한 문자열 보내기
    // 단순한 문자열 대신 HTML로 응답하고 싶다면 res.sendFile메서드를 사용하면 됨. 파일의 경로는 path 모듈을 사용해서 지정해야 함.
    // res.sendFile(path.join(__dirname, '/index.html'));
    console.log('GET / 요청에서만 실행됩니다');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

/*
    미들웨어 안에 미들웨어를 넣는 방식 : 조건에 따라 다른 미들웨어 사용 가능해서 편함
    app.use((req, res,next) => {
        if (process.env.NODE_ENV === 'production') {
            morgan('combined')(req, res, next);
        } else {
            morgan('dev')(req, res, next);
        }
    });

*/

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})

