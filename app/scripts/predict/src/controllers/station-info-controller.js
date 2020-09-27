// Generated by IcedCoffeeScript 108.0.13

/*
* File: station-info-controller
* User: Pu
* Date: 2019/12/24
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/project-base-controller'], function(base) {
  var StationInfoController, exports;
  StationInfoController = (function(_super) {
    __extends(StationInfoController, _super);

    function StationInfoController($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options) {
      StationInfoController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options);
    }

    StationInfoController.prototype.initialize = function() {
      StationInfoController.__super__.initialize.apply(this, arguments);
      return this.stationbg = "/predict/res/img/" + this.$routeParams.station + ".png";
    };

    return StationInfoController;

  })(base.ProjectBaseController);
  return exports = {
    StationInfoController: StationInfoController
  };
});