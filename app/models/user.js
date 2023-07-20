module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: { args: true, msg: 'Account already exists with your email.' },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING
        },

        mobile: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['admin', 'user', 'other']],
            }
        },
        status: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['pending', 'active', 'other']],
            }
        },
        token: {
            type: Sequelize.STRING
        },
        is_email_verify: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,

        },
    },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return User
}