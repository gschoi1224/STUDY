const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            host: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('free', 'premium'), // 넣을 수 있는 값을 제한하는 데이터 형식
                allowNull: false,
            },
            clientSecret: {
                type: Sequelize.UUID, // 충돌 가능성이 매우 적은 랜덤한 문자열
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains',
        });
    }

    static associate(db) {
        db.Domain.belongsTo(db.User);
    }
};