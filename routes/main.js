var Project = require('../models/project.js');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.use(bodyParser.json());

  app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname + '/../views/'});

    /*var project = new Project({
        name: "Photo URL Integrity Tool",
        description: "This tool batch-requests a set of image URLs as defined in a list or file, then returns them to the client as they are processing via server sent events.",
        imageurl: "img/Capture.PNG",
        demourl: "http://seanryan.tips/photourls/",
        browsers: [
            "Firefox",
            "Internet Explorer",
            "Chrome",
            "iOS"
        ],
        source: "https://github.com/Piefayth/angular-portfolio",
        builton: [
            "node.js",
            "Bootstrap",
            "jQuery"
        ],
        notes: "A variable controls the amount of concurrent urls that the server will process to prevent 100% server resource usage from a single client.",
        mechanism: "After parsing the URLs from the provided input, this tool attempts to access each resource. It returns a pass or fail based on the http status code and the MIME type of the body of the response.",
        mode: "normal",
        cache: null
    });

    project.save(function(err){
      if(err) console.log(err);
    });*/

  });

  app.get('/normal-project', function(req, res){
    res.sendFile('normal-project.html', {root: __dirname + '/../views/'});
  })

  app.get('/edit-project', function(req, res){
    res.sendFile('edit-project.html', {root: __dirname + '/../views/'})
  })

  app.get('/api/projects', function(req, res){

    //get list of projects

    var response = Project.find().exec(function(err, data){
      response = data;
      res.json(response);
    });

  });

  app.post('/api/projects', function(req, res){

    //create a new project

    var project = new Project(req.body);
    project.mode = 'normal';
    project.save(function(err){
      if (err) console.log(err);
      res.json(project);
    })

  })

  app.get('/api/projects/:project', function(req, res){
    //get one project by id req.params.project
  })

  app.put('/api/projects/:project', function(req, res){
    console.log(req.body)
    var project = req.body;

    Project.findOne({ id: project.id }, function(err, dbUpdateProject){
      for(var key in project){
        if(project[key] && dbUpdateProject[key]){
          dbUpdateProject[key] = project[key];
        }
      }
      dbUpdateProject.save();
    })
  })

  app.delete('/api/projects/:project', function(req, res){
    //deletes one project by id req.params.project

    Project.find({id: req.params.project.id}).remove().exec();

    res.end();
  })

}
