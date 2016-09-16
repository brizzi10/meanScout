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
  .controller("playersShowController", playersShowCtrl)
  .controller("scoutShowController", scoutShowCtrl);

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
      })
      .state("scoutShow", {
        url: "/scout",
        templateUrl: "/html/scout-show.html",
        controller: "scoutShowController",
        controllerAs: "sShowVM"
      });
      $urlRouterProvider.otherwise("/");
    }



    playerFactory.$inject = ["$resource"];
    function playerFactory($resource){
      var Player = $resource("/api/players/:name", {}, {
        update: {method: "PATCH"}
      });
      return Player;
    }

    playersIndexCtrl.$inject = ["Player"];
    function playersIndexCtrl(Player){
      var vm = this;
      vm.players = Player.query();
      vm.create = function(){
        Player.save(vm.newPlayer, function(response){
          vm.players.push(response);
        });
      }
    }

    playersShowCtrl.$inject = ["$stateParams", "Player", "$state"];
    function playersShowCtrl($stateParams, Player, $state){
      var vm = this;
      vm.player = Player.get($stateParams);
      vm.delete = function(){
        Player.remove($stateParams, function(){
          $state.go("playersIndex");
        });
      }
      vm.update = function(){
        Player.update($stateParams, vm.player, function(response){
          $state.go("playersShow", response);
        })
      }
    }

    scoutShowCtrl.$inject = ["$stateParams", "Player", "$state", "$scope"]
    function scoutShowCtrl($stateParams, Player, $state, $scope){
      var vm = this;
      vm.players = Player.query();

      $scope.setMaster = function(player){
        $scope.selected = player;
      }

      $scope.isSelected = function(player){
        return $scope.selected == player;
      }

      $scope.addOnClick = function(event) {
        var offsetX = event.offsetX
        var offsetY = event.offsetY
        console.log(event.offsetX);
        console.log(event.offsetY);
        console.log($scope.selected);
      }
    }

  })();
