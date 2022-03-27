const res = require('express/lib/response');
const http = require('http')
path = require('path')
express = require('express')
bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const app = express()
app.use(express.static('.'))
app.user(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const db = new sqlite3.Database(':memory:')
db.serialize(function () {
    db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)")
    db.run("INSERT INTO user VALUES ('privilegedUser', 'privilegedUser1', 'Administrator')")
})

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.post('/login', function (req, res) {
    let username = req.body.username
    let password = req.body.password
    let query = "SELECT title FROM user WHERE username = â€˜â€ + username + â€œâ€™ AND password = â€˜â€ + password + â€œâ€™;"

    console.log(username, password, query)
})

db.get(query, function (err, row) {
    if (err) {
        console.log('ERROR', err)
        res.redirect("/index.html#error")
    } else if (!row) {
        res.redirect("/index.html#unauthorized")
    } else {
        res.send('Hello')
    }
})

app.listen(3469)