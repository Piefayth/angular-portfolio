var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller("ProjectList", function($scope){
  $scope.projects = [
    { 'name': 'Photo URL Integrity Tool',
      'description': 'This tool batch-requests a set of image URLs as defined in a list or file, then returns them to the client as they are processing via server sent events.',
      'imageurl': 'img/Capture.PNG',
      'demourl': 'http://seanryan.tips/photourls/',
      'browsers': ['Firefox', 'Internet Explorer', 'Chrome', 'iOS'],
      'source': 'https://github.com/Piefayth/angular-portfolio',
      'builton': ['node.js', 'Bootstrap', 'jQuery'],
      'notes': 'A variable controls the amount of concurrent urls that the server will process to prevent 100% server resource usage from a single client.',
      'mechanism': 'After parsing the URLs from the provided input, this tool attempts to access each resource. It returns a pass or fail based on the http status code and the MIME type of the body of the response.',
      'mode': 'normal',
      'cache': null
    },
    { 'name': 'Popgom',
      'description': 'A user and room manager for HTML5 multiplayer games. Includes 1 to 1 or group chat and an API for partnered developers to access users in their game\'s rooms. Additionally includes a multiplayer demo game.',
      'imageurl': 'img/Capture2.PNG',
      'demourl': 'http://seanryan.tips/popgom/',
      'browsers': ['Firefox', 'Chrome'],
      'source': 'https://github.com/Piefayth/angular-portfolio',
      'builton': ['node.js', 'socket.io', 'jQuery'],
      'notes': 'This project wasn\'t built on any particular framework. It largely uses jQuery for the DOM manipulation, and any cleanup associated with removed elements is done manually. Minimal server side templating was done with EJS.',
      'mechanism': 'Each \"page\" of the application is a dumb template served via http then populated with logic after the response completes. Rooms are tracked with MongoDB as well as with socket.io\'s rooms abstraction, requiring them to be kept carefully in sync.',
      'mode': 'normal',
      'cache': null
    }];

  $scope.changeMode = function(project){
    if(project.mode == 'normal'){
      project.cache = angular.copy(project);
      project.mode = 'edit';
    } else {
      project.mode = 'normal';
    }
  }
  $scope.discardChanges = function(project){
    if(project.mode == 'edit'){
      for(var k in project.cache){
        project[k] = project.cache[k];
      }
      project.mode = 'normal';
    }
  }

  $scope.removeProject = function(project){
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
    $scope.projects.unshift(newproject);
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
