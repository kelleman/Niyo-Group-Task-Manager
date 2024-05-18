const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-task', authenticateToken, taskController.createTask);
router.get('/tasks', authenticateToken, taskController.getTasks);
router.get('/task/:id', authenticateToken, taskController.getTaskById)
router.put('/edit-task/:id', authenticateToken, taskController.updateTask);
router.delete('/delete-task/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
