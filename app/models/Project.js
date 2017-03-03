var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    URL:String,

    student: {type :mongoose.Schema.ObjectId, ref: 'Student'}

})

var Project = mongoose.model("project", projectSchema);

module.exports = Project;
