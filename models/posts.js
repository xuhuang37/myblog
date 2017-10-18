var marked = require('marked')
var Post = require('../lib/mongo').Post
Post.plugin('contentToHtml', {
    afterFind: function(posts) {
        return posts.map(function (post) {
            post.content = marked(post.content)
            return post
        })
    },
    afterFindOne:function(post) {
        if(post){
            post.content = marked(post.content)
        }
        return post
    }
})
module.exports = {
    //创建一篇文章
    create:function(post) {
        return Post.create(post).exec()
    },
    //通过文章id获取一篇文章
    getPostById:function(postId) {
        return Post.findOne({_id: postId})
        .populate({path: 'author', model:'User'})
        .addCreatedAt()
        .contentToHtml()
        .exec()
    },
    //通过创建时间获取所有文章或某个特定用户的所有文章
    getPosts:function(author) {
        var query = {}
        if(author){
            query.author = author
        }
        return Post
            .find(query)
            .populate({path: 'author', model:'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .contentToHtml()
            .exec()
    },
    //通过文章id给pv加1
    incPv:function(postId) {
        return Post
            .update({_id: postId},{ $inc: {pv:1}})
            .exec()
    },
    //通过id获取一篇原声文章
    getRawPostById:function(postId) {
        return Post.findOne({_id: postId})
                .populate({path: 'author', model: 'User'})
                .exec()
    },
    updatePostById:function(postId, author, data) {
        return Post.update({ author:author,_id: postId},{$set:data}).exec()
    },
   // 通过用户 id 和文章 id 删除一篇文章
    delPostById: function delPostById(postId, author) {
        return Post.remove({ author: author, _id: postId }).exec();
  }

}