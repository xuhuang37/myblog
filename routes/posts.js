const express = require('express')
const router = express.Router()
var PostModel = require('../models/posts')
let checkLogin = require('../middlewares/check').checkLogin

router.get('/', (req, res, next)=>{
    // res.send('1111111')
    res.render('posts')
})

router.post('/', checkLogin, (req, res, next)=>{
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;
  
    // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题');
      }
      if (!content.length) {
        throw new Error('请填写内容');
      }
    } catch (e) {
      req.flash('error', e.message);
      return res.redirect('back');
    }
  
    var post = {
      author: author,
      title: title,
      content: content,
      pv: 0
    };
  
    PostModel.create(post)
      .then(function (result) {
        // 此 post 是插入 mongodb 后的值，包含 _id
        post = result.ops[0];
        req.flash('success', '发表成功');
        // 发表成功后跳转到该文章页
        res.redirect(`/posts/${post._id}`);
      })
      .catch(next);
})

router.get('/create',checkLogin, (req, res, next)=>{
    res.render('create')
})

router.get('/:postId',(req, res, next)=>{
    res.send(req.flash())
})

router.get('/:postId/edit', checkLogin,(req, res, next)=>{
    res.send(req.flash())
})

router.post('/:postId/edit', checkLogin, (req, res, next)=>{
    res.send(req.flash())
})
router.post('/:postId/remove', checkLogin, (req, res, next)=>{
    res.send(req.flash())
})

router.post('/:postId/comment', checkLogin, (req, res, next)=>{
    res.send(req.flash())
})
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, res, next)=>{
    res.send(req.flash())
})

module.exports = router