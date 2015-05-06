var Project = require('../models/project.js');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(session({ secret: 'thisismysecrettherearemanylikeitbutthisoneismine', resave: false, saveUninitialized: false }));
  var parse = bodyParser.urlencoded({extended: false});


  /*
  Use the following to generate a password for the one and only one user.
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync('yourpassword', salt);
  */

  app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname + '/../views/'});
  });

  app.get('/admin', function(req, res){
    res.sendFile('admin.html', {root: __dirname + '/../views/'});
  })

  app.post('/admin', parse, function(req, res){
    if(bcrypt.compareSync(req.body.password, '$2a$10$DZruKtzIvqtsKzz8Vm7xeemGI.TqjU25y31g1qkbkSVsJA4fOTpte')){
      req.session.auth = true;
      res.redirect('/');
    } else {
      res.end();
    }
  })

  app.get('/normal-project', function(req, res){
    res.sendFile('normal-project.html', {root: __dirname + '/../views/'});
  })

  app.get('/edit-project', function(req, res){
    res.sendFile('edit-project.html', {root: __dirname + '/../views/'})
  })

  app.get('/api/projects', function(req, res){

    //get list of projects

    var response = Project.find().sort('-timestamp').exec(function(err, data){
      response = data;
      res.json(response);
    });

  });

  app.post('/api/projects', function(req, res){

    //create a new project
    if(req.session && req.session.auth){
      var project = new Project(req.body);
      project.mode = 'normal';
      project.save(function(err){
        if (err) console.log(err);
        res.json(project);
      })
    } else {
      res.end();
    }

  })

  app.get('/api/projects/:project', function(req, res){
    //get one project by id req.params.project
  })

  app.put('/api/projects/:project', function(req, res){
    if(req.session && req.session.auth){
      var project = req.body;

      Project.findOne({ id: project.id }, function(err, dbUpdateProject){
        for(var key in project){
          if(project[key] && dbUpdateProject[key]){
            dbUpdateProject[key] = project[key];
          }
        }
        dbUpdateProject.save();
      })
    } else {
      res.end();
    }
  })

  app.delete('/api/projects/:project', function(req, res){
    //deletes one project by id req.params.project
    if(req.session && req.session.auth){
      Project.find({id: req.params.project.id}).remove().exec();
    }
    res.end();
  })

}
