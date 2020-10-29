const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = new express();

app.set('port', process.env.PORT || 3000);

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', 
    upload.fields([{ name : 'image1'}, {name : 'image2'}, {name : 'image3'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 대기중');
});