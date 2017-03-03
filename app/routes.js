// require dependincies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');

// add routes
router.get('/', projectController.getProjectSum);
router.get('/studenthome', projectController.viewstudenthome);
router.post('/studentsum', projectController.viewstudenthome);

router.get('/createportfolio', projectController.viewcreateportfolio);
router.post('/sum', projectController.getProjectSum);

router.post('/project', projectController.createProject);

router.get('/index',projectController.getAllProjects) ;
router.get('/logout',projectController.logout) ;


router.get('/studentregister', projectController.viewstudentregister);
router.post('/student', projectController.createStudent);
router.post('/studentlogin', projectController.loginStudent);

router.get('/clientregister', projectController.viewclientregister);

// export router

module.exports = router;
