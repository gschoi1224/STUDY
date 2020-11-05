const mongoose = require('mongoose');

const connect = () => {
    // 1. 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 코드
    if (process.env.NODE_ENV !== 'production')  {
        mongoose.set('debug', true);
    }
    
    // 2. 몽구스와 몽고디비를 연결하는 부분. 몽고디비 주소로 접속을 시도함. 접속을 시도하는 주소의 데이터베이스는 admin이지만 실제로 사용할 데이터베이스는 nodejs이므로 두 번째 인수로 dbName 옵션을 줘서
    // nodejs 데이터베이스를 사용하게 함. 마지막 인수로 주어진 콜백 함수를 통해 연결 여부를 확인함.
    // useNewUrlParser : true와 usecreateIndex: true는 입력하지 않아도 되지만 콘솔에 경고 메시지가 뜸
    mongoose.connect('mongodb://root:1234@localhost:27017/admin', {
        dbName : 'nodejs',
        useNewUrlParser : true,
        useCreateIndex : true,
    }, error => {
        if (error)  {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};

// 3. 몽구스 커넥션에 이벤트 리스너 달기. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도함.
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;