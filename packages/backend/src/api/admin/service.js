
const addNotification = {
    post: async (connection, options) => {

        await connection.Notifications.create({...options})

        return {
            'success': true,
            'result': {
                "signal": 'Notification successfully added'
            },
        }
    }
};


module.exports = {
    addNotification,
};
