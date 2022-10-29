// Importing express module
const express = require('express');
const app = express();
const fs = require('fs')
let port = 3000;
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.post('/', (req, res) => {
    // username: admin, password:admin
    const { username, password } = req.body;
    const { authorization } = req.headers;
    let arrError = [];
    let status = false;
    let users;
    // kiểm tra user và password rỗng
    if (!username) {
        // thêm err vào mảng 
        arrError.push({
            type: 'Username',
            message: 'Vui lòng nhập username'
        })
    }
    else if (!password) {
        arrError.push({
            type: 'Password',
            message: 'Vui lòng nhập password'
        })
    } else {

        let data = fs.readFileSync('user.txt');
        let users = JSON.parse(data);
        // kiểm tra username và password đúng k
        let incorectUsername = 0;
        let incorectPassword = 0;
        users.forEach(item => {
            if (item.username == username) {
                incorectUsername++;
            }
            if (item.password == password) {
                incorectPassword++;
            }
        });
        if (incorectUsername == 0) {
            arrError.push({
                type: 'Username',
                message: 'username không đúng'
            })
        }
        if (incorectPassword == 0) {
            arrError.push({
                type: 'Password',
                message: 'password không đúng'
            })
        }
        else {
            status = true;
        }
    }
    if (status) {
        res.send({
            message: 'Login thành công',
            status: 200,
        });
    } else {
        res.send({
            status: 400,
            errors: arrError
        });
    }

})

app.listen(port, () => {
    console.log(`server running: http://127.0.0.1:${port}`);
});
