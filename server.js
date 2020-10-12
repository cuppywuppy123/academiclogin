const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const fs = require('fs');
var cookie_1;
const bodyParser = require('body-parser');
const accessTokenSecret = 'youraccesstokensecret';
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose')
const uri = "mongodb+srv://hana_bot:CCGNeehvdmdM0NBA@cluster0.fe6tr.mongodb.net/<db>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    if (err) return console.error(err)
    console.log('Connected to Database')
});

const ObjectID = require('mongodb').ObjectID;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const db = client.db('<db>')
    const usersCollection = db.collection('users')
    db.collection('users').find().toArray()
        .then(results => {
            // Read username and password from request body
            //console.log(req);
            const { name, password } = req.body;
            console.log(name);
            console.log(password);
            console.log(req.body);
            // Filter user from the users array by username and password
            const user = results.find(u => { return u.name === name && u.password === password });
            if (user) {
                // Generate an access token
                const accessToken = jwt.sign({ name: user.name, role: user.role }, accessTokenSecret);
                fs.writeFileSync('jwtkey.log', accessToken, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                    fs.close();
                });
                cookie_1 = {
                    'role': JSON.stringify(user.role),
                    'name': JSON.stringify(user.name),
                    'password': JSON.stringify(user.password),
                    'email': JSON.stringify(user.email),
                    'phonenumber': JSON.stringify(user.phonenumber),
                    'about': JSON.stringify(user.about),
                    'city': JSON.stringify(user.city),
                    'country': JSON.stringify(user.country),
                    'company': JSON.stringify(user.company),
                    'school': JSON.stringify(user.school)
                };
                var jsonresponse = {};
                jsonresponse.userDetails = user;
                jsonresponse.accessToken = accessToken;
                //res.cookie('city', JSON.stringify(user.city)).send('cookie set');
                res.send(cookie_1);
                /*res.json({
                    jsonresponse
                });*/
            } else {
                res.send('Username or password incorrect');
            }
        })
        .catch(error => console.error(error))
});

app.post('/setcookie', (req, res) => {
    const db = client.db('<db>')
    const usersCollection = db.collection('users')
    db.collection('users').find().toArray()
        .then(results => {
            // Read username and password from request body
            //console.log(req);
            const { name, password } = req.body;
            console.log(name);
            console.log(password);
            console.log(req.body);
            // Filter user from the users array by username and password
            const user = results.find(u => { return u.name === name && u.password === password });
            if (user) {
                // Generate an access token
                const accessToken = jwt.sign({ name: user.name, role: user.role }, accessTokenSecret);
                cookie_1 = {
                    'role': JSON.stringify(user.role),
                    'name': JSON.stringify(user.name),
                    'password': JSON.stringify(user.password),
                    'email': JSON.stringify(user.email),
                    'phonenumber': JSON.stringify(user.phonenumber),
                    'about': JSON.stringify(user.about),
                    'city': JSON.stringify(user.city),
                    'country': JSON.stringify(user.country),
                    'company': JSON.stringify(user.company),
                    'school': JSON.stringify(user.school)
                };

                var jsonresponse = {};
                jsonresponse.userDetails = user;
                jsonresponse.accessToken = accessToken;

            } else {
                res.send('name or password incorrect');
            }
        })
        .catch(error => console.error(error))
});

app.post('/retrieve', (req, res) => {
    console.log(cookie_1);
    res.json(cookie_1);
});

app.post('/users', (req, res) => {
    const db = client.db('<db>')
    const usersCollection = db.collection('users')
    usersCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            fs.writeFile('role.log', req.body['role'], function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        })
        .catch(error => console.error(error))
});

app.post('/update', (req, res) => {
    const db = client.db('<db>')
    const usersCollection = db.collection('users')
    console.log(req.body)
    usersCollection.deleteOne({ 'email': JSON.parse(cookie_1.email) }, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
    cookie_1 = {
        'role': req.body.role,
        'name': req.body.name,
        'password': req.body.password,
        'email': req.body.email,
        'phonenumber': req.body.phonenumber,
        'about': req.body.about,
        'city': req.body.city,
        'country': req.body.country,
        'company': req.body.company,
        'school': req.body.school
    };
    usersCollection.insertOne(cookie_1)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
});

app.post('/createcourse', (req, res) => {
    req.body.teachername = JSON.parse(cookie_1.name)
    req.body.teachername_indicator = 'teacher_record'
    const db = client.db('<db>')
    const usersCollection = db.collection('courses')
    console.log(req.body)
    usersCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
});

app.post('/registercourse', (req, res) => {
    req.body.studentname = JSON.parse(cookie_1.name)
    req.body.studentname_indicator = 'student_record'
    const db = client.db('<db>')
    const usersCollection = db.collection('courses')
    console.log(req.body)
    usersCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
});

app.post('/readcourses', (req, res) => {
    const db = client.db('<db>')
    const coursesCollection = db.collection('courses')
    db.collection('courses').find().toArray()
        .then(results => {
            var needle = JSON.parse(cookie_1.name)
            var re = '\n'
            for (var i = 0; i < results.length; i++) {
                if (results[i].teachername == needle) {
                    re += results[i].courseid + "\n"
                }
            }
            console.log(re)
            res.send(re);
        })
        .catch(error => console.error(error))
});

app.post('/readcoursesstudents', (req, res) => {
    const db = client.db('<db>')
    const coursesCollection = db.collection('courses')
    db.collection('courses').find().toArray()
        .then(results => {
            var needle = JSON.parse(cookie_1.name)
            console.log(needle)
            var re = '\n'
            for (var i = 0; i < results.length; i++) {
                if (results[i].studentname == needle) {
                    re += results[i].courseid + "\n"
                }
            }
            console.log(re)
            res.send(re);
        })
        .catch(error => console.error(error))
});


app.listen(8080, () => {
    console.log('Authentication service started on port 8080');
});

