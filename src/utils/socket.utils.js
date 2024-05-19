const sendTaskCreatedNotification = (task, io) => {
    if (io) {
        io.emit('taskCreated', task);
    } else {
        console.error('Socket.io instance is not defined');
    }
};

module.exports = {
    sendTaskCreatedNotification
};
