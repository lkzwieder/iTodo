/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $rootScope, $ionicModal, $ionicPopover, $timeout) {
   // Form data for the login modal
   $scope.loginData = {};
   $scope.isExpanded = false;
   $scope.hasHeaderFabLeft = false;
   $scope.hasHeaderFabRight = false;

   var navIcons = document.getElementsByClassName('ion-navicon');
   for (var i = 0; i < navIcons.length; i++) {
     navIcons.addEventListener('click', function() {
         this.classList.toggle('active');
     });
   }

   $rootScope.currentColumn = "backlog";

   $scope.createNewTask = function() {
      $state.go('app.new');
   };

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

  .controller('NewCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, DataService, $rootScope, $state) {
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    ionicMaterialInk.displayEffect();

    // Form
    $scope.title = 'New';
    $scope.task = {author: "Lucas Tettamanti"}; // TODO user from login

    $scope.done = function() {
      DataService.newTask($rootScope.currentColumn, $scope.task);
      $state.go('app.column', {column: $rootScope.currentColumn});
    };
    $scope.cancel = function() {
      $state.go('app.column', {column: $rootScope.currentColumn});
    };
  })

  .controller('UpdateCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, DataService, $rootScope, $state) {
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    ionicMaterialInk.displayEffect();

    $scope.title = "Update";
    // Form
    $scope.task = DataService.getTaskById($stateParams.taskId, $stateParams.column);
    $scope.status = $rootScope.currentColumn;

    $scope.done = function() {
      DataService.updateTask($scope.status, $scope.task);
      $state.go('app.column', {column: $rootScope.currentColumn});
    };
    $scope.cancel = function() {
      $state.go('app.column', {column: $rootScope.currentColumn});
    };
  })

.controller('BacklogCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, DataService, $rootScope) {
   $scope.tasks = DataService.getColumn('backlog');
   $scope.$parent.showHeader();
   $scope.$parent.clearFabs();
   $scope.isExpanded = false;
   $scope.$parent.setHeaderFab(true);

   $rootScope.currentColumn = "backlog";

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ColumnCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, DataService, $rootScope) {
   $scope.column = $stateParams.column;
   $rootScope.currentColumn = $stateParams.column;
   $scope.tasks = DataService.getColumn($stateParams.column);
   $scope.image = 'img/bug.png';

   $scope.$parent.showHeader();
   $scope.$parent.clearFabs();
   $scope.isExpanded = true;
   $scope.$parent.setExpanded(false);
   $scope.$parent.setHeaderFab('right');

   $timeout(function() {
     ionicMaterialMotion.fadeSlideIn({
         selector: '.animate-fade-slide-in .item'
     });
   }, 200);

   // Activate ink for controller
ionicMaterialInk.displayEffect();
})

.controller('TaskCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, DataService, $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.column = $stateParams.column;
    $scope.task = DataService.getTaskById($stateParams.taskId, $stateParams.column);

    $scope.updateTask = function(taskId, column) {
      $state.go('app.update', {taskId: taskId, column: column, data: $scope.task});
      console.log(arguments, $scope.task);
      return;
    };
    $scope.deleteTask = function(taskId, column) {
      console.log(arguments);
      return;
    };
    $scope.watchTask = function(taskId, column) {
      console.log(arguments);
      return;
    };
})
;
