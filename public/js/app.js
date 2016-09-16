"use strict";

(function(){
  angular
  .module("scout",[
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Player", playerFactory)
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

  playerFactory.$inject = ["$resource"];
  function playerFactory($resource){
    var Player = $resource("/api/players");
    return Player;
  }

  playersIndexCtrl.$inject = ["Player"];
  function playersIndexCtrl(Player){
    var vm = this;
    vm.players = Player.query();
  }
  playersShowCtrl.$inject = ["$stateParams"];
  function playersShowCtrl($stateParams){
    var vm = this;
    vm.player = $stateParams;
  }
})();
