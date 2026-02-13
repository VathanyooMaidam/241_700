/*//ทำการ import โมดูลที http
const express = require('express');
const app = express();
const port = 8000;

//กำหนดค่า server
const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello World! this is my first backend server.');
}
//run server
const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});/*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 8000;

let users = [];
let counter = 1;
/**
  GET /users - ดึงข้อมูลผู้ใช้ทั้งหมด
  POST /user - เพิ่มผู้ใช้ใหม่
  GET /user/:id - ดึงข้อมูลผู้ใช้ตาม id
  PUT /user/:id - แก้ไขข้อมูลผู้ใช้ตาม id ที่บันทึก
  DELETE /user/:id - ลบผู้ใช้ตาม id ที่บันทึก
 */

// path: = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// path: = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;

    users.push(user);
    res.json({message: "User created successfully", user: user});
});

// path: = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

//หา user ที่จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);
    
//อัพเดทข้อมูล users
    if (updateUser.fristname) {
        users[selectedIndex].fristname = updateUser.fristname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully', 
        data: {
            user: updateUser,
            indexUpdated: selectedIndex
        }
    });
    //ส่ง user ที่อัพเดทแล้วกลับไป 
})

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    //หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    
    //ลบ user ออกจาก users
    users.splice(selectedIndex, 1);
    res.json({message: 'User deleted successfully', indexDeleted: selectedIndex});
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});