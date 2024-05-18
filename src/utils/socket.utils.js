const sendTaskCreatedNotification = (task, io) => {
    io.emit('taskCreated', task);
};

module.exports = {
    sendTaskCreatedNotification
};