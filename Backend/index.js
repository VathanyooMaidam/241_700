const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const port = 8000;

let conn = null;
const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}

app.get('/users', async (req, res) => {
    try {
        const result = await conn.query('SELECT * FROM users');
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const validateData = (userData) => {
    let errors = [];
    if(!userData.firstname) {
        errors.push("กรุณากรอกชื่อ");
    }   
    if(!userData.lastname) {
        errors.push("กรุณากรอกนามสกุล");
    }
    if(!userData.age) {
        errors.push("กรุณากรอกอายุ");
    } else if (isNaN(userData.age)) {
        errors.push("กรุณากรอกอายุเป็นตัวเลข");
    }
    if(!userData.gender) {
        errors.push("กรุณาเลือกเพศ");
    }
    if(!userData.interests) {
        errors.push("กรุณาเลือกงานอดิเรกอย่างน้อย 1 อย่าง");
    }
    if(!userData.description) {
        errors.push("กรุณากรอกคำอธิบาย");
    }
    return errors;
}

app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) {
            throw {
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
                errors: errors
            }
        }
        const result = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            Message: 'Users added successfully',
            data: result[0]
        });
    } catch (error) {
        const errorMessage = error.message || 'Error adding users';
        const errorDetails = error.errors || [];
        console.error('Error inserting users:', error);
        res.status(500).json({ 
            message: errorMessage,
            errors: errorDetails
        });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('SELECT * FROM users WHERE id = ?', id);
        if (result[0].length === 0) {
            throw { statusCode: 404, message: 'Users not found' };
        }
        res.json(result[0][0]);
    } catch (error) {
        console.error('Error fetching users:', error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: error.message || 'Error fetching users'
        });
    }
});



app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;
        const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);
        res.json({
            Message: 'User updated successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/testdb2', async (req, res) => {
    try {
        const result = await conn.query('SELECT * FROM users');
        res.json(result[0]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;
        const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);
        res.json({
            Message: 'User updated successfully',
            data: result[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            Message: 'User deleted successfully',
            data: result[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, async () => {
    await initMysql();
    console.log(`Server is running on http://localhost:${port}`);
});