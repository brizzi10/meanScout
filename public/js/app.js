"use strict";

(function(){
  var app = angular
  .module("scout",[
    "ui.router",
    "ngResource",
    "chart.js"
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

      $scope.height_chart = window.innerHeight*0.7;

      $scope.series = ['Make', 'Miss'];

      $scope.colors = ['#459c1d', '#bf3535'];

      $scope.options = {
        legend: {
            display: true,
            labels: {
            boxWidth: 10            }
          },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              max: 400,
              min: 0
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
            max: 300,
            min: 0
          }
          }]
        }
      };

      $scope.data = [
        [{
          x: 6,
          y: 300-287,
          r: 5
        },
        {
          x: 72,
          y: 300-139,
          r: 5
        }],
        [{
          x: 200,
          y: 300-97,
          r: 5
        }]
      ];


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
        $scope.shot = true;
      }
      $scope.hide = function(event){
        $scope.shot = false;
      }
      vm.make = function(){
        console.log("shots fired");
      }
    }

    // app.directive('drawCircle', function() {
    //   return {
    //     scope: {
    //       x: '@x',
    //       y: '@y'
    //     },
    //     link: function(scope, element, attrs) {
    //       var x = parseInt(scope.x);
    //       var y = parseInt(scope.y);
    //       var canvas = element.parent();
    //       var ctx = canvas[0].getContext("2d");
    //       ctx.beginPath();
    //       ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    //       ctx.lineWidth = 0.2;
    //       ctx.stroke();
    //       ctx.fill();
    //     }
    //   }
    // });


  })();
