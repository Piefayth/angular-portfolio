var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller("ProjectList", function($scope){
  $scope.projects = [
    { 'name': 'Photo URL Integrity Tool',
      'description': 'This tool batch-requests a set of image URLs as defined in a list or file, then returns them to the client as they are processing via server sent events.',
      'imageurl': 'img/Capture.PNG',
      'browsers': ['Firefox', 'Internet Explorer', 'Chrome'],
      'social': ['Reddit', 'Facebook', 'Github'],
      'builton': ['Node.js', 'Bootstrap', 'jQuery'],
      'notes': 'A variable controls the amount of concurrent urls that the server will process to prevent 100% server resource usage from a single client.',
      'mechanism': 'After parsing the URLs from the provided input, this tool attempts to access each resource. It returns a pass or fail based on the http status code and the MIME type of the body of the response.',
      'mode': 'normal',
      'cache': null
    },
    { 'name': 'Photo URL Integrity Tool 2',
      'description': 'This tool batch-requests a set of image URLs as defined in a list or file, then returns them to the client as they are processing via server sent events.',
      'imageurl': 'img/Capture.PNG',
      'browsers': ['Firefox', 'Internet Explorer', 'Chrome'],
      'social': ['Reddit', 'Facebook', 'Github'],
      'builton': ['Node.js', 'Bootstrap', 'jQuery'],
      'notes': 'A variable controls the amount of concurrent urls that the server will process to prevent 100% server resource usage from a single client.',
      'mechanism': 'After parsing the URLs from the provided input, this tool attempts to access each resource. It returns a pass or fail based on the http status code and the MIME type of the body of the response.',
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
  $scope.removeBrowser = function(project, browser){
    project.browsers.splice(project.browsers.indexOf(browser), 1);
  }

  $scope.addBrowser = function(project, browser){
    if(project.browsers.indexOf(browser) == -1)
      project.browsers.push(browser);
  }

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
