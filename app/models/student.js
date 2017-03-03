var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    mobile:{
        type:Number ,
        required:true

    },
    username:{
        type:String,
        required:true,
        unique: true
      //  index: true

    },
    password:{
        type:String,
        required:true,
        unique: true

    },
    proj:{ type: Array
     }
})

var Student = mongoose.model("student", studentSchema);

module.exports = Student;
