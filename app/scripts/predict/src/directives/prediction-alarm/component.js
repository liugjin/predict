// Generated by IcedCoffeeScript 108.0.13

/*
* File: prediction-alarm-directive
* User: David
* Date: 2020/02/12
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var PredictionAlarmDirective, exports;
  PredictionAlarmDirective = (function(_super) {
    __extends(PredictionAlarmDirective, _super);

    function PredictionAlarmDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.addZero = __bind(this.addZero, this);
      this.createLineCharts = __bind(this.createLineCharts, this);
      this.setEchartsData = __bind(this.setEchartsData, this);
      this.groupArr = __bind(this.groupArr, this);
      this.processEvent = __bind(this.processEvent, this);
      this.subscribeValues = __bind(this.subscribeValues, this);
      this.setData = __bind(this.setData, this);
      this.show = __bind(this.show, this);
      this.id = "prediction-alarm";
      PredictionAlarmDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    PredictionAlarmDirective.prototype.setScope = function() {};

    PredictionAlarmDirective.prototype.setCSS = function() {
      return css;
    };

    PredictionAlarmDirective.prototype.setTemplate = function() {
      return view;
    };

    PredictionAlarmDirective.prototype.show = function(scope, element, attrs) {
      return this.setData(scope, element);
    };

    PredictionAlarmDirective.prototype.setData = function(scope, element) {
      scope.events = {};
      scope.eventsArray = [];
      scope.xData = [];
      scope.seriesData = [];
      scope.eventSubscriptionArray = [];
      scope.eventsArray.splice(0, scope.eventsArray.length);
      scope.xData.splice(0, scope.xData.length);
      scope.seriesData.splice(0, scope.seriesData.length);
      this.createLineCharts(scope, element);
      return this.subscribeValues(scope, element);
    };

    PredictionAlarmDirective.prototype.subscribeValues = function(scope, element) {
      var eventSubscription, filter;
      filter = {
        user: scope.project.model.user,
        project: scope.project.model.project,
        station: scope.station.model.station
      };
      eventSubscription = this.commonService.eventLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, msg) {
          if (err) {
            return console.log(err);
          }
          return _this.processEvent(scope, element, msg);
        };
      })(this));
      return scope.eventSubscriptionArray.push(eventSubscription);
    };

    PredictionAlarmDirective.prototype.processEvent = function(scope, element, data) {
      var event, k, key, message, v, _results;
      if (!data) {
        return;
      }
      message = data.message;
      key = "" + message.user + "." + message.project + "." + message.station + "." + message.equipment + "." + message.event + "." + message.severity + "." + message.startTime;
      if (scope.events.hasOwnProperty(key)) {
        event = scope.events[key];
        _results = [];
        for (k in message) {
          v = message[k];
          _results.push(event[k] = v);
        }
        return _results;
      } else {
        event = angular.copy(message);
        scope.events[key] = event;
        if (event.eventType === "divine" && event.phase === "start") {
          scope.eventsArray.push(event);
          return this.groupArr(scope, element, "equipmentName");
        }
      }
    };

    PredictionAlarmDirective.prototype.groupArr = function(scope, element, field) {
      var att, ev, item, obj, _i, _len, _ref;
      if (scope.eventsArray.length > 0) {
        obj = {};
        _ref = scope.eventsArray;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ev = _ref[_i];
          for (item in ev) {
            if (item === field) {
              obj[ev[item]] = {
                list: obj[ev[field]] ? obj[ev[field]].list : [],
                type: ev[field]
              };
            }
          }
          obj[ev[field]].list.push(ev);
        }
        att = [];
        for (item in obj) {
          att.push({
            list: obj[item].list,
            type: obj[item].type
          });
        }
        return this.setEchartsData(scope, element, att);
      }
    };

    PredictionAlarmDirective.prototype.setEchartsData = function(scope, element, att) {
      var va, _i, _len;
      scope.xData.splice(0, scope.xData.length);
      scope.seriesData.splice(0, scope.seriesData.length);
      for (_i = 0, _len = att.length; _i < _len; _i++) {
        va = att[_i];
        scope.xData.push(va.type);
        scope.seriesData.push(va.list.length);
      }
      return this.createLineCharts(scope, element);
    };

    PredictionAlarmDirective.prototype.createLineCharts = function(scope, element) {
      var line, option, _ref;
      line = element.find(".echartsContent");
      if ((_ref = scope.echart) != null) {
        _ref.dispose();
      }
      option = {
        color: ['#00A7FF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: scope.xData,
          axisLine: {
            lineStyle: {
              color: "#FFFFFF"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(0,77,160,1)"
            }
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: "#F5FCFF"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(0,77,160,1)"
            }
          }
        },
        series: [
          {
            type: 'bar',
            barGap: '0%',
            name: '预测告警',
            data: scope.seriesData,
            markPoint: {
              data: [
                {
                  type: 'max',
                  name: '最大值'
                }
              ]
            }
          }
        ]
      };
      scope.echart = echarts.init(line[0]);
      scope.echart.setOption(option);
      scope.resize = (function(_this) {
        return function() {
          return _this.$timeout(function() {
            var _ref1;
            return (_ref1 = scope.echart) != null ? _ref1.resize() : void 0;
          }, 100);
        };
      })(this);
      window.addEventListener('resize', scope.resize);
      return window.dispatchEvent(new Event('resize'));
    };

    PredictionAlarmDirective.prototype.addZero = function(num) {
      if (parseInt(num) < 10 && parseInt(num) > 0) {
        num = '0' + num;
      }
      return num;
    };

    PredictionAlarmDirective.prototype.resize = function(scope) {};

    PredictionAlarmDirective.prototype.dispose = function(scope) {
      return scope.eventSubscriptionArray.forEach((function(_this) {
        return function(sub) {
          return sub.dispose();
        };
      })(this));
    };

    return PredictionAlarmDirective;

  })(base.BaseDirective);
  return exports = {
    PredictionAlarmDirective: PredictionAlarmDirective
  };
});