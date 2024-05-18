const { validationResult } = require('express-validator');
const Task = require('../models/taskModel');
const {sendTaskCreatedNotification} = require('../utils/socket.utils')

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check for authorization (assuming middleware is used before this route)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newTask = new Task({
      user: req.user._id, // Associate task with logged-in user
      title,
      description,
    });

    const savedTask = await newTask.save();

    // Emit real-time notification to all users
    sendTaskCreatedNotification(savedTask, io);

    res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all tasks for the authenticated user
exports.getTasks = async (req, res, next) => {
    try {
        const user = req.user.id;
        const tasks = await Task.find({ user });

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get a task by ID
exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user.id;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// Update a task
exports.updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        const updatedTask = await task.save();

        res.status(200).json({
            message: 'Task successfully updated',
            task: {
                taskId: updatedTask._id,
                user: updatedTask.user,
                title: updatedTask.title,
                description: updatedTask.description,
                completed: updatedTask.completed,
                createdAt: updatedTask.createdAt,
                updatedAt: updatedTask.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the task by ID
        const task = await Task.findById(id);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the logged-in user is the owner of the task
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Delete the task using deleteOne
        await task.deleteOne();

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};