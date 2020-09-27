// Generated by IcedCoffeeScript 108.0.13

/*
* File: single-query-date-directive
* User: David
* Date: 2020/04/02
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", 'gl-datepicker'], function(base, css, view, _, moment, gl) {
  var SingleQueryDateDirective, exports;
  SingleQueryDateDirective = (function(_super) {
    __extends(SingleQueryDateDirective, _super);

    function SingleQueryDateDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "single-query-date";
      SingleQueryDateDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    SingleQueryDateDirective.prototype.setScope = function() {};

    SingleQueryDateDirective.prototype.setCSS = function() {
      return css;
    };

    SingleQueryDateDirective.prototype.setTemplate = function() {
      return view;
    };

    SingleQueryDateDirective.prototype.show = function($scope, element, attrs) {
      var setGlDatePicker;
      $scope.modes = [
        {
          mode: 'none',
          modeName: "时间段"
        }, {
          mode: 'day',
          modeName: "日查询"
        }, {
          mode: 'year',
          modeName: "本年"
        }, {
          mode: 'month',
          modeName: "本月"
        }
      ];
      $scope.mode = {};
      $scope.time = {
        startTime: moment().subtract(7, "days").startOf('day').format('L'),
        endTime: moment().endOf('day').format('L'),
        mode: 'none',
        modeName: '时间段'
      };
      setGlDatePicker = function(element, value) {
        if (!value) {
          return;
        }
        return setTimeout(function() {
          return gl = $(element).glDatePicker({
            dowNames: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            selectedDate: moment(value).toDate(),
            onClick: function(target, cell, date, data) {
              var day, month;
              month = date.getMonth() + 1;
              if (month < 10) {
                month = "0" + month;
              }
              day = date.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              target.val(date.getFullYear() + "-" + month + "-" + day).trigger("change");
              if ($scope.time.mode === 'day') {
                $scope.time.startTime = moment($scope.time.startTime).startOf('day').format('L');
                $scope.time.endTime = moment($scope.time.startTime).endOf('day').format('L');
                return $('#mymodes').hide();
              } else {
                $scope.time.mode = 'none';
                return $scope.time.modeName = '自定义';
              }
            }
          });
        }, 500);
      };
      setGlDatePicker($('#enddate')[0], $scope.time.startTime);
      $scope.selectMode = function(mode) {
        $(".gldp-default").css("z-index", 9999);
        switch (mode.mode) {
          case 'year':
            $scope.time.startTime = moment().startOf('year').format('L');
            $scope.time.endTime = moment().endOf('year').format('L');
            $scope.time.mode = mode.mode;
            $scope.time.modeName = mode.modeName;
            return $('#mymodes').hide();
          case 'month':
            $scope.time.startTime = moment().startOf('month').format('L');
            $scope.time.endTime = moment().endOf('month').format('L');
            $scope.time.mode = mode.mode;
            $scope.time.modeName = mode.modeName;
            return $('#mymodes').hide();
          case 'day':
            $scope.time.startTime = moment().startOf('day').format('L');
            $scope.time.endTime = moment().endOf('day').format('L');
            $scope.time.mode = mode.mode;
            $scope.time.modeName = mode.modeName;
            return $('#mymodes').hide();
          case 'none':
            $scope.time.startTime = moment().startOf('day').format('L');
            $scope.time.endTime = moment().endOf('day').format('L');
            $scope.time.mode = mode.mode;
            $scope.time.modeName = mode.modeName;
            return $('#mymodes').hide();
        }
      };
      $scope.formatDate = (function(_this) {
        return function(id) {
          $(".gldp-default").css("z-index", 9999);
          return $scope.time.endTime = moment($scope.time.endTime).format('L');
        };
      })(this);
      $scope.$watch('time', (function(_this) {
        return function(time) {
          return _this.commonService.publishEventBus('time', time);
        };
      })(this), true);
      return $scope.myenter = function(id) {
        var nowvalue;
        $(".gldp-default").css("z-index", 9999);
        nowvalue = $('#enddate').offset().left;
        return $('.gldp-default').css("left", nowvalue + 'px');
      };
    };

    SingleQueryDateDirective.prototype.resize = function(scope) {};

    SingleQueryDateDirective.prototype.dispose = function(scope) {};

    return SingleQueryDateDirective;

  })(base.BaseDirective);
  return exports = {
    SingleQueryDateDirective: SingleQueryDateDirective
  };
});