var portfolioApp = angular.module('portfolioApp', ['ngResource']);

portfolioApp.controller("ProjectList", function($scope, Project){

  $scope.projects = Project.query(function(){});

  //Logic for the Edit and Save buttons
  $scope.changeMode = function(project){
    if(project.mode == 'normal'){
      project.cache = angular.copy(project);
      project.mode = 'edit';
    } else {
      project.$update(function(){});
      project.mode = 'normal';
    }
  }

  $scope.discardChanges = function(project){
    if(project.mode == 'edit' && project.cache != null){

      for(var k in project.cache){
        if(project.cache[k])
          project[k] = project.cache[k];
      }
      project.mode = 'normal';
    }
  }

  $scope.removeProject = function(project){

    project.$delete(function(){
      console.log('baleeted');
    });

    if($scope.projects.indexOf(project) != -1){
      $scope.projects.splice($scope.projects.indexOf(project), 1);
    }

  }

  $scope.addNewProject = function(){

    var newproject = {
      'name': 'New Project',
      'description': 'Your Description',
      'imageurl': 'http://yourimage.jpg',
      'demourl': 'http://projectlocation.com',
      'browsers': [],
      'source': 'https://github.com/?',
      'builton': [],
      'notes': 'Some notes',
      'mechanism': 'How does it work?',
      'mode': 'edit',
      'cache': null
      }

    Project.save(newproject, function(savedProject){
      console.log(savedProject);
      newproject.id = savedProject.id;
      $scope.projects.unshift(savedProject);
    });
  }

  $scope.removeBrowser = function(project, browser){

    project.browsers.splice(project.browsers.indexOf(browser), 1);
  }

  $scope.addBrowser = function(project, browser){
    if(project.browsers.indexOf(browser) == -1)
      project.browsers.push(browser);
  }

  $scope.addBuiltOn = function(project){
    if(project.builton.length < 5)
      project.builton.push('');
  }

  $scope.removeBuiltOn = function(project, item){
    if(project.builton.indexOf(item) != -1){
      project.builton.splice(project.builton.indexOf(item), 1);
    }
  }

})
.config(function($anchorScrollProvider){
  $anchorScrollProvider.disableAutoScrolling();
})
.factory('Project', function($resource){
  return $resource('/api/projects/:id', { id: '@_id' },
    {
      'update': { method:'PUT' }
    });
})

portfolioApp.controller("BrowserList", function($scope){
  $scope.browsers = [
      'Firefox',
      'Internet Explorer',
      'Chrome',
      'Android',
      'Safari',
      'iOS'
    ]

  $scope.clicked = false;

  $scope.showAvailableBrowsers = function(browsers){
    $scope.clicked = !$scope.clicked;
  }

  $scope.browsersMissing = function(browserList){
    return function(browser){
      if(browserList.indexOf(browser) == -1){
        return true;
      } else {
        return false;
      }
    }
  }

})
