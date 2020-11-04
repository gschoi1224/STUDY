const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) { // 테이블에 대한 설정
        return super.init({ // sequelize는 알아서 id를 기본 키로 연결하기 때문에 id 칼럼은 적어줄 필요 없음
            name : {    // VARCHAR -> STRING, INT -> INTEGER, TINYINT -> BOOLEAN, DATETIME -> DATE
                type : Sequelize.STRING(200),
                allowNull : false,  // NOT NULL 
                unique : true,
            },
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            comment : {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            created_at : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        },
        {   // 테이블의 옵션
            /*
                sequelize : static init 메서드의 매개변수와 연결되는 옵션. db.sequelize 개겣를 넣어야 함. 나중에 model/index.js에서 연결함
                timestamps : 이 속성 값이 true면 시퀄라이즈는 createAt과 updateAt 칼럼을 추가함. 각각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력됨.
                underscored : 시퀄라이즈는 기본적으로 테이블명과 칼럼명을 캐멀케이스(createdAt)로 만듦. 이를 스네이크 케이스(created_at)로 바꾸는 옵션.
                modelName : 모델 이름을 서정할 수 있음. 노드 프로젝트에서 사용함.
                tableName : 실제 데이터베이스의 테이블 이름이 됨. 기본적으로는 모델 이름을 소문자 및 복수형으로 만듦. 모델 이름이 User라면 테이블 이름은 users가 됨.
                paranoid : true로 설정하면 deletedAt이라는 칼럼이 생김. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록됨. 로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우를 조회함.
                charset과 collate : 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력됨. 이모티콘까지 입력할 수 있게 하고싶다면 utf8mb4와 utf8mb4_general_ci를 입력함.
            */
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) { // 1 의 경우
        db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
    } // 다른 모델과의 관계
}