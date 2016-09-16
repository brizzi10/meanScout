"use strict";

(function(){
  angular
  .module("scout",[
    "ui.router"
  ])
  .config(Router);

  Router.$inject = ["$stateProvider", "$locationProvider"];
  function Router($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("main", {
      url: "/",
      template: "<h2>This is working</h2>"
    })
    .state("test", {
      url: "/test",
      template: "<h2>This is also working</h2>"
    });
    $urlRouterProvider.otherwise("/");
  }
})();
