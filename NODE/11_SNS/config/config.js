// 시퀄라이즈에서 JSON 대신 JS 파일을 설정 파일로 쓸 수 있게 지원해줌
require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'nodebird',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'nodebird_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        databse: 'nodebird',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false, // 쿼리가 실행될 때마다 콘솔에 남지 못하게 함
    }
};