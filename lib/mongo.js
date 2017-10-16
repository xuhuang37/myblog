var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string'},
    bio:{type:'string'}
})

exports.User.index({name:1}, {unique:true}).exec()