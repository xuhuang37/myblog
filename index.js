const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')

const app = express()

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

//session 中间件

app.use(session({
    name:config.session.key,//设置cookie中保存session id的字段名
    secret: config.session.secret,//通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防篡改
    resave:true,//强制更新session
    saveUninitialized:false,//设置为false，强制创建一个session，即使用户登录
    cookie:{
        maxAge:config.session.maxAge//过期时间， 过期后cookie中的session id自动删除

    },
    store:new MongoStore({//将session存储到mongodb
        url: config.mongodb//mongodb地址
    })
}))
//flash中间件 用来显示通知
app.use(flash())

routes(app)

//监听端口，启动程序
app.listen(config.port, ()=> {
    console.log(`${pkg.name} listenning on port ${config.port}`)
})

app.listen(3009)