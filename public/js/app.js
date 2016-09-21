"use strict";

(function(){
  var app = angular
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

    playersShowCtrl.$inject = ["$stateParams", "Player", "$state", "$scope"];
    function playersShowCtrl($stateParams, Player, $state, $scope){
      var vm = this;
      vm.player = Player.get($stateParams);

      // var idImage = "playerChart";
      // var canvas = document.getElementById($scope.idImage);
      // var ctx = canvas.getContext('2d');
      // var canvasFont = "30px Arial";
      // var make = "o";
      // var miss = "x";
      // var xCo = 20;
      // var yCo = 35;
      //
      //
      // $scope.draw = function(){
      //   ctx.font = $scope.canvasFont;
      //   ctx.filltext($scope.make, $scope.xCo, $scope.yCo);
      // }

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

    scoutShowCtrl.$inject = ["$stateParams", "Player", "$state", "$scope","$http"]
    function scoutShowCtrl($stateParams, Player, $state, $scope, $http){
      var vm = this;
      vm.players = Player.query();

      $scope.setMaster = function(player){
        $scope.selected = player;
      }

      $scope.isSelected = function(player){
        return $scope.selected == player;
      }

      $scope.addOnClick = function(event) {
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        console.log(event.offsetX);
        console.log(event.offsetY);
        console.log($scope.selected);
        $http.post("/api/test", {player: $scope.selected, coordinates: {x: offsetX, y:offsetY}});
      }
    }
    app.directive('drawCircle', function() {
      return {
        scope: {
          x: '@x',
          y: '@y'
        },
        link: function(scope, element, attrs) {
          var x = parseInt(scope.x);
          var y = parseInt(scope.y);
          var canvas = element.parent();
          var ctx = canvas[0].getContext("2d");
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
          ctx.lineWidth = 0.2;
          ctx.stroke();
          ctx.fill();
        }
      }
    });

  })();
