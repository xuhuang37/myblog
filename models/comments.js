var marked = require('marked')
var Comment= require('../lib/mongo').Comment

//将comment的content从markdown转为html
Comment.plugin('contentToHtml', {
    afterFind:function(comments) {
        return comments.map((comment)=>{
            comment.content = marked(comment.content)
            return comment
        })
    }
})

module.exports = {
    //创建一个留言
    create:function(comment) {
        return Comment.create(comment).exec()
    },
    //通过用户id和留言id删除一个留言
    delCommentById:function(commentId, author) {
        return Comment.remove({ author:author, _id:commentId}).exec()
    },
    delCommentByPostId:function(postId) {
        return Comment.remove({postId:postId}).exec()
    },

    getComments:function(postId) {
        return Comment.find({postId:postId})
        .populate({ path: 'author', model:'User'})
        .sort({_id: 1})
        .addCreatedAt()
        .contentToHtml()
        .exec()
    },
    getCommentsCount:function(postId) {
        return Comment.count({postId:postId}).exec()
    }

}