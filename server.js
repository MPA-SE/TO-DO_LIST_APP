const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let tasks = [];

app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.json({ message: 'Task added successfully' });
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < tasks.length) {
        tasks.splice(id, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
