var Post = require('../lib/mongo').Post

module.exports = {
    //创建一篇文章
    create:function(post) {
        return Post.create(post).exec()
    }
}