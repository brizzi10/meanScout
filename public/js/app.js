"use strict";

(function(){
  angular
  .module("scout",[
    "ui.router"
  ])
  .config(Router)
  .controller("playersIndexController", playersIndexCtrl)
  .controller("playersShowController", playersShowCtrl);

  Router.$inject = ["$stateProvider", "$locationProvider",
  "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider,
  $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("playersIndex", {
      url: "/",
      templateUrl: "/html/players-index.html",
      controller: "playersIndexController",
      controllerAs: "pIndexVM"
    })
    .state("playersShow", {
      url: "/player/:name",
      templateUrl: "/html/players-show.html",
      controller: "playersShowController",
      controllerAs: "pShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function playersIndexCtrl(){
    var vm = this;
    vm.players = [
      {name: "Jack"},
      {name: "Tyrique"},
      {name: "Colden"},
      {name: "Ayrion"}
    ];
  }
  playersShowCtrl.$inject = ["$stateParams"];
  function playersShowCtrl($stateParams){
    var vm = this;
    vm.player = $stateParams;
  }
})();
