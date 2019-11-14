module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        // 用户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 名
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 姓
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false
    })
}