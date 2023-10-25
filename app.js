const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const Department = require('./models/department');

const app = express();


// Connect to MongoDB
mongoose.connect('mongodb://localhost/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes and CRUD operations here

// Example: Create a new employee
app.post('/employees', async (req, res) => {
    try {
        const { firstName, lastName, department } = req.body;
        const newEmployee = new Employee({ firstName, lastName, department });
        await newEmployee.save();
        res.json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create an employee.' });
    }
});

// Example: Get a list of all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve employees.' });
    }
});

// Define more routes and CRUD operations for departments as needed

const port = process.env.NODE_LOCAL_PORT || 3020;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
