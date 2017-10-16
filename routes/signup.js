const express = require('express')
const router = express.Router()

let checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, (req, res, next)=>{
    res.send(req.flash())
})

router.post('/', checkNotLogin, (req, res, next)=>{
    res.send(req.flash())
})

module.exports = router