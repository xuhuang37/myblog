const express = require('express')
const router = express.Router()

let checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, (req, res, next)=>{
    res.send(req.flash())
})

module.exports = router