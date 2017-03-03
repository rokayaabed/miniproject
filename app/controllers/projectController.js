var dialog = require('dialog');
let Project = require('../models/Project');
let Student = require('../models/student');



let projectController = {

  viewstudenthome:function(req, res){
    // The next Page to be sent to the client
   var nextPageNum = req.body.nextPageNum | 0;
    var pageSize = 10;


    Student.find({ "proj.0": { "$exists": true }},{}, { skip: nextPageNum*pageSize, limit: pageSize }, function(err, students){
   //console.log('bd');
        if(err)
            res.send(err.message);
        else{

              nextPageNum = nextPageNum +1;
              res.render('studenthome', {students, nextPageNum, welcome : 'WELCOME  ' + req.session.user.name + ' !'});


        }
    });
  //res.render('studenthome');
  },
  viewcreateportfolio:function(req, res){

      res.render('createportfolio');

  },

  viewstudentregister:function(req, res){

      res.render('studentregister');

  },
  viewclientregister:function(req, res){

      res.render('clientregister');

  },

  getProjectSum:function(req, res){

        // The next Page to be sent to the client
        var nextPageNum = req.body.nextPageNum | 0;
        var pageSize = 10;


Student.find({ "proj.0": { "$exists": true }},{}, { skip: nextPageNum*pageSize, limit: pageSize }, function(err, students){
       console.log(students);
            if(err)
                res.send(err.message);
            else{

                  nextPageNum = nextPageNum +1;
                  res.render('home', {students, nextPageNum});


            }
        });


    },

    getAllProjects:function(req, res){

var sess = req.session.user;

        Project.find({student: sess._id},function(err, projects){
        //  console.log("here!!");
        //  console.log(projects);
            if(err)
                res.send(err.message);
           if (projects.length == 0 ){
              res.render('createportfolio')

            }
            else{
                res.render('index', {  projects, title : req.session.user.name })

          }

        })
  },

    createProject:function(req, res){
      var sess = req.session.user;
        let project = new Project({
          title: req.body.title,
          URL: req.body.URL,
          student: req.session.user._id


        });
      //  var proj1 = sess.proj.push(req.body.title);



        project.save(function(err, project){
            if(err){
                //res.send(err.message)
                dialog.info('Please Rename your project! ');

                console.log(err);
            }
            else{
              Student.findOneAndUpdate({_id: req.session.user._id}, {"$push": {"proj" : req.body.title}},function(err, student) {
          if (err) {
            console.log('got an error');
          }
          if (student){
        student.markModified('anything');
        }
          
        });

                res.redirect('index');
            }
        })

      //  console.log(sess.proj);
    },
    createStudent:function(req, res){
        let student = new Student({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          username: req.body.username,
          password: req.body.password,
          proj : []
        });

        student.save(function(err, student){
            if(err){
              //  res.send(err.message)
                dialog.info('Please Re-enter username and password! ');
            }
            else{
              //  console.log(student);
              dialog.info('You Have Been Successfully Registered! ');
              res.redirect('/');
            }
        })
    },

    loginStudent:function(req, res){
    //  let student = new Student(req.body);

var  username1 = req.body.Username;
var password1 = req.body.Password;


    Student.findOne({username : username1 , password: password1}, function(err, Student){
      if(err){
                     console.log(err);

                 }

                   if (!Student){
                     dialog.info('Incorrect Username or Password ');



}else {
req.session.user = Student;
//console.log('student');
//console.log(req.session.user.email);

req.session.save(function (err) {
  if (err) return next(err)

    res.redirect('studenthome');
  })
}
})
},
logout:function(req, res){
  req.session.destroy();

  res.redirect('/');


}
}

module.exports = projectController;
