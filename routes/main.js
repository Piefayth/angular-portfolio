module.exports = function(app){

  var secretVariable = 'Roll, dog.';

  app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname + '/../views/'});
  });

  app.get('/normal-project', function(req, res){
    res.sendFile('normal-project.html', {root: __dirname + '/../views/'});
  })

  app.get('/edit-project', function(req, res){
    res.sendFile('edit-project.html', {root: __dirname + '/../views/'})
  })

}
