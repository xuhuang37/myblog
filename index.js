const path = require('path')
const express = require('express')

const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(3000)