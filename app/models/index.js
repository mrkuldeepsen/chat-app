const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    operatorsAliases: 0,
    hooks: {
        beforeDefine: function (columns, model) {
            // model.tableName = 'initial_' + model.name.plural
        },
        afterCreate: (record) => {
            delete record.dataValues.password
        },
        afterUpdate: (record) => {
            delete record.dataValues.password
        },
    },
    define: {
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const db = {
    sequelize: sequelize,
    User: require('./user')(sequelize, Sequelize),
}


db.sequelize.sync({ alter: true, }).then(() => { console.log('Yes re-sync') })
module.exports = db