const { json } = require('express');
const express = require('express');
const { readFile } = require("fs");
const { title } = require('process');
var port = 3000
var app = express();
app.use(express.json())
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "views")

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) {
                return reject(new Error(err))
            }
            data = JSON.parse(data)
            return resolve(data)
        })
    })
}

app.get('/', (res, rep) => {
    readFilePromise('Profile.json')
        .then((data) => {
            let result = { title: "Danh sach sinh vien", data: data }
            rep.render('index', result)
        })
        .catch((err) => {
            console.log(err)
        })
})


app.get("/gender", (res, rep) => {

    let slug = res.query.gender
    let gender = "-1"
    if (slug == "nam") {
        gender = "1"
    } else if (slug == "nu") {
        gender = "0"
    }
    readFilePromise("Profile.json")
        .then((data) => {
            let query = data.filter((item) => {
                return item.gender == gender
            })
            console.log(query)
            if (query.length != 0) {
                rep.render("index", { data: query, title: "Danh sách sinh viên", })
            } else {
                rep.render("error", { title: "404" })
            }

        })
        .catch((error) => {
            console.log(error);
        })
})


app.get('/:tien', (res, rep) => {
    let slug = res.params.tien
    readFilePromise('Profile.json')
        .then(data => {
            let result = data.filter((item) => {
                return item.slug == slug
            })
            console.log(result)
            if(result.length != 0){
                rep.render('Actor',{profile: result[0]})
            }else{
                console.log('err')
            }
        })
        .catch((error) => {
            console.log(error + "")
        })
})



app.listen(port, () => {
    console.log(`server running: http://localhost:${port}`)
})