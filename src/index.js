const express = require('express')

const app = express()

    .use(express.json())

    .use(express.urlencoded({ extended: false }))

    .get('/', (req, res) => res.send("welcome to test api"))

    .use('/fire', require('./routers/user.router'), require('./routers/admin.routers'))

    .listen(4000, () => console.log("successfylly server create http://localhost:3030/fire"))