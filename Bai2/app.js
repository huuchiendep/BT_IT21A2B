// Importing express module
const express = require('express');
const app = express();
const fs = require('fs')
let port = 4000;
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/data', (req, res) => {
    // username: admin, password:admin
    data=fs.readFileSync('VehiclePlates.txt');
    vehicles=JSON.parse(data);
    res.send({result:vehicles})
})

app.listen(port, () => {
    console.log(`server running: http://127.0.0.1:${port}`);
});
