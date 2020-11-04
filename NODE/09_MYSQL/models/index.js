// sequelize-cli가 자동으로 생성해주는 코드는 그대로 사용할 때 에러가 발생하고, 필요 없는 부분도 많으므로 아래와 같이 수정함.
const Sequelize = require('sequelize'); // 시퀄라이즈 패키지이자 생성자

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development'; // 기본값이 development
const config = require('../config/config')[env];  // test와 production은 테스트 용도와 배포 용도로 접속하기 위해 설정함
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize); // 모듈의 init을 호출하는 것.
Comment.init(sequelize);

User.associate(db); // 다른 테이블과의 관계를 연결하는 메서드
Comment.associate(db);

module.exports = db;