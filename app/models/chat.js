module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define('chats', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
    },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return Chat
}