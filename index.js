var express = require('express');
var app = express();
var cors = require('cors')
const upload = require("express-fileupload")
const uuid = require("uuid")
const Math = require("mathjs")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const authenticateToken = require("./Auth")
app.use(upload())
var ACCESS_TOKEN_SECRET = "963d48d8a5bbe8acd67458646d5d469f45bfda4b75629e20944efa56a24d32201c16c005da46b2fd7f8867fbf589541e957f51bbe19b3a9c6dd1c3aa473bba7e"
app.use(express.static('./data'))
app.post("/login", (req, res) => {
    const operatorJson = JSON.parse(fs.readFileSync("./data/User.json"))
    let postToken = false
    const name = req.body.name
    const parol = req.body.parol

    const accesToken = jwt.sign(name, ACCESS_TOKEN_SECRET)

    operatorJson.map(item => {
        if (item.name === req.body.name && item.parol === req.body.parol) {
            postToken = true
        } 4
    })
    if (postToken === true) {
        res.status(200).send(accesToken)
    } else {
        res.status(400).send("parol or Username is Error")
    }
})



app.get("/user", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    res.status(200).send(TeacherData)
})
app.post('/user', (req, res) => {
    const UserData = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))

    console.log(req.body.name.length > 2, "ism");
    console.log(req.body.surname.length > 5, "fam");
    console.log(req.body.year * 1 >= 18, "yosh");
    console.log(req.body.pasportnum.length == 9, "pasportnum");
    console.log(req.body.pasportser.length == 2, "pasportser");
    console.log(req.body.category >= 1, "toifa");
    console.log(req.body.parol.length > 8, "parol");

    if (req.body.name.length > 2 && req.body.surname.length > 5 && req.body.year * 1 >= 18 &&
        req.body.pasportnum.length == 9 && req.body.pasportser.length == 2 && req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.parol.length > 8) {
        var data = {
            "id": uuid.v1(),
            "name": req.body.name,
            "surname": req.body.surname,
            "year": req.body.year * 1,
            "pasportser": req.body.pasportser,
            "pasportnum": req.body.pasportnum,
            "pay": 0,
            "access": false,
            "category": req.body.category,
            "parol": req.body.parol,
            "test": [],
            "testaccess": 0,
            "result": []
        }
        UserData.unshift(data)
        fs.writeFileSync("./data/User.json", JSON.stringify(UserData, 0, 2), "utf-8")
        res.status(200).send(data)
    } else {
        res.status(500).send("malumot yetarli emas")
    }
})
app.delete('/user/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User.splice(kluch, 1)
        fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send("o`chirildi")
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})

app.put('/user/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {

        User[kluch].name = req.body.name ? (req.body.name) : (User[kluch].name)
        User[kluch].surname = req.body.surname ? (req.body.surname) : (User[kluch].surname)
        User[kluch].year = req.body.year * 1 ? (req.body.year) : (User[kluch].year * 1)
        User[kluch].pasportser = req.body.pasportser ? (req.body.pasportser) : (User[kluch].pasportser)
        User[kluch].pasportnum = req.body.pasportnum ? (req.body.pasportnum) : (User[kluch].pasportnum)
        User[kluch].pay = 0 ? (req.body.pay) : (User[kluch].pay)
        User[kluch].access = false ? (req.body.access) : (User[kluch].access)
        User[kluch].category = req.body.category ? (req.body.category) : (User[kluch].category)
        User[kluch].parol = req.body.parol ? (req.body.parol) : (User[kluch].parol)
        User[kluch].test = [] ? (req.body.test) : (User[kluch].test)
        User[kluch].testaccess = 0 ? (req.body.testaccess) : (User[kluch].testaccess)
        User[kluch].result = [] ? (req.body.result) : (User[kluch].result)


        fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})


app.get("/test", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    res.status(200).send(TeacherData)
})
app.post('/test', (req, res) => {
    const UserData = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))


    if (req.body.variant > 0 && req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.savol.length > 0 && req.body.javob.length > 0 && req.body.variant1.length > 0 && req.body.variant2.length > 0 && req.body.variant3.length > 0 && req.body.variant4.length > 0) {
        var data = {
            "id": uuid.v1(),
            "variant": req.body.variant * 1,
            "category": req.body.category,
            "savol": req.body.savol,
            "javob": req.body.javob * 1,
            "variant1": req.body.variant1,
            "variant2": req.body.variant2,
            "variant3": req.body.variant3,
            "variant4": req.body.variant4,

        }
        UserData.unshift(data)
        fs.writeFileSync("./data/test.json", JSON.stringify(UserData, 0, 2), "utf-8")
        res.status(200).send(data)
    } else {
        res.status(500).send("malumot yetarli emas")
    }
})
app.delete('/test/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User[kluch].variant = req.body.variant ? req.body.variant : User[kluch].variant,
            User[kluch].category = req.body.category ? req.body.category : User[kluch].category,
            User[kluch].savol = req.body.savol ? req.body.savol : User[kluch].savol,
            User[kluch].javob = req.body.javob ? req.body.javob : User[kluch].javob,
            User[kluch].variant1 = req.body.variant1 ? req.body.variant1 : User[kluch].variant1,
            User[kluch].variant2 = req.body.variant2 ? req.body.variant2 : User[kluch].variant2,
            User[kluch].variant3 = req.body.variant3 ? req.body.variant3 : User[kluch].variant3,
            User[kluch].variant4 = req.body.variant4 ? req.body.variant4 : User[kluch].variant4,
            fs.writeFileSync("./data/test.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})
app.post('/test/start/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    const Test = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == req.params.id && item.testaccess > 0) {
            kluch = key
        }
    })
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    if (kluch < 0) {
        res.status(500).send("siz yuborgan id topilmadi yoki test bajarishga ruxsat yoq")
    } else {
        var variand1 = []
        for (let i = 0; i < Test.length; i++) {
            var push = true
            for (let j = 0; j < variand1.length; j++) {
                if (Test[i].variant == variand1[j]) {
                    push = false
                }
            }
            if (push) {
                variand1.push(Test[i].variant)
            }
        }
        var testVariand = getRandomInt(variand1.length)
        console.log(variand1)

        var allTest = []
        Test.map(item => {
            if (item.variant == variand1[testVariand]) {
                allTest.push(item)
            }
        })
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours()
        let minut = date.getMinutes();
        let currentDate = `${day}-${month}-${year}-${hour}-${minut}`;
        let currentDate2 = `${day}-${month}-${year}-${(minut + allTest.length) > 60 ? hour + 1 : hour}-${(minut + allTest.length) > 60 ? (minut - 60 + allTest.length) : minut + allTest.length}`;
        var data = {
            "id": uuid.v1(),
            "startDay": currentDate,
            "finish": currentDate2,
            "variand": variand1[testVariand],
            "result": 0
        }
        User[kluch].testaccess--
        User[kluch].result.push(data)
        fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(allTest)
    }
})
app.post('/test/natija/:id', (req, res) => {
    var data = req.body.data;
    const test = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    var prosent
    for (let i = 0; i < User.length; i++) {
        if (User[i].id == req.params.id) {

        }


    }

})


app.get("/video", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    res.status(200).send(TeacherData)
})
app.get("video/user/:id", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var token = false
    var category
    TeacherData.map(item => {
        if (item.access == true && item.id == req.params.id) {
            token = true
            category = item.category
        }
    })
    var sendData = []
    TeacherData.map(item => {
        if (item.category == category) {
            sendData.push(item)
        }
    })

    if (token) {
        res.status(200).send(sendData)
    } else {
        var ss = []
        for (let i = 0; i < 3; i++) {
            ss.push(sendData[i])
        }
        res.status(200).send(ss)
    }
})
app.post('/video', (req, res) => {
    const UserData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))

    if (req.body.link.length > 1 && req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.dars.length > 1) {
        var data = {
            "id": uuid.v1(),
            "link": req.body.link.replace("watch?", "embed/"), 
            "category": req.body.category,
            "dars": req.body.dars,
        }
        UserData.unshift(data)
        fs.writeFileSync("./data/video.json", JSON.stringify(UserData, 0, 2), "utf-8")
        res.status(200).send(data)
    } else {
        res.status(500).send("malumot yetarli emas")
    }
})
app.delete('/video/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User.splice(kluch, 1)
        fs.writeFileSync("./data/video.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send("o`chirildi")
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})
app.put('/video/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User[kluch].link = req.body.link ? req.body.link.replace("watch?", "embed/") : User[kluch].link,
            User[kluch].category = req.body.category ? req.body.category : User[kluch].category,
            User[kluch].dars = req.body.dars ? req.body.dars : User[kluch].dars,
            fs.writeFileSync("./data/video.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})

app.options(cors());
app.listen(8000, function () {
    console.log('Listening to Port 8000');
});