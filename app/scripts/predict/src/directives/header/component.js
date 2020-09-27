// Generated by IcedCoffeeScript 108.0.13

/*
* File: header-directive
* User: David
* Date: 2019/03/08
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var HeaderDirective, exports;
  HeaderDirective = (function(_super) {
    __extends(HeaderDirective, _super);

    function HeaderDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.link = __bind(this.link, this);
      this.id = "header";
      HeaderDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    HeaderDirective.prototype.setScope = function() {};

    HeaderDirective.prototype.setCSS = function() {
      return css;
    };

    HeaderDirective.prototype.setTemplate = function() {
      return view;
    };

    HeaderDirective.prototype.link = function(scope, element, attrs) {
      var eventStatisticFun, project;
      scope.setting = setting;
      scope.params = this.$routeParams;
      scope.$watch('$root.user', (function(_this) {
        return function(root) {
          var err;
          try {
            scope.rootUser = root.user;
          } catch (_error) {
            err = _error;
          }
          scope.switchLanguage = function(s) {
            return scope.$parent.mvm.switchLanguage(s);
          };
          return scope.logout = function() {
            return scope.$parent.mvm.logout();
          };
        };
      })(this));
      scope.getEventColor = (function(_this) {
        return function(severity) {
          var color, _ref, _ref1, _ref2, _ref3;
          return color = (_ref = scope.$root.project) != null ? (_ref1 = _ref.dictionary) != null ? (_ref2 = _ref1.eventseverities) != null ? (_ref3 = _ref2.getItem(severity)) != null ? _ref3.model.color : void 0 : void 0 : void 0 : void 0;
        };
      })(this);
      eventStatisticFun = (function(_this) {
        return function(event) {
          var key;
          key = "" + event.user + "." + event.project + "." + event.station + "." + event.equipment + "." + event.event + "." + event.severity + "." + event.startTime;
          if (scope.statisticsEvents.hasOwnProperty(key)) {
            if (event.endTime && !scope.statisticsEvents[key].endTime) {
              scope.eventStatistic.activeEvents--;
              scope.eventStatistic.eventSeverity.splice(scope.eventStatistic.eventSeverity.indexOf(event.severity), 1);
              scope.statisticsEvents[key] = event;
            }
            if (event.phase === 'completed' && !(scope.statisticsEvents[key].phase === 'completed')) {
              scope.eventStatistic.totalEvents--;
              delete scope.statisticsEvents[key];
            }
          } else if (!(event.phase === 'completed')) {
            scope.statisticsEvents[key] = event;
            if (!event.endTime) {
              scope.eventStatistic.activeEvents++;
              scope.eventStatistic.eventSeverity.push(event.severity);
            }
            scope.eventStatistic.totalEvents++;
          }
          return scope.eventStatistic.severity = _.max(scope.eventStatistic.eventSeverity);
        };
      })(this);
      project = null;
      return scope.$watch('params', (function(_this) {
        return function(params) {
          var projectIds, _ref;
          if (params.project) {
            if (project === params.project) {
              return;
            }
            _this.getProject(scope, function() {
              var _ref;
              return scope.logo = (_ref = scope.project.model.setting) != null ? _ref.logo : void 0;
            });
            project = params.project;
          }
          if ((_ref = _this.statisticSubscription) != null) {
            _ref.dispose();
          }
          scope.statisticsEvents = {};
          scope.eventStatistic = {
            activeEvents: 0,
            totalEvents: 0,
            severity: 0,
            eventSeverity: []
          };
          projectIds = {
            user: params.user,
            project: params.project
          };
          if (projectIds.user) {
            return _this.statisticSubscription = _this.commonService.eventLiveSession.subscribeValues(projectIds, function(err, d) {
              if (d.message) {
                return eventStatisticFun(d.message);
              }
            });
          }
        };
      })(this), true);
    };

    HeaderDirective.prototype.resize = function(scope) {};

    HeaderDirective.prototype.dispose = function(scope) {
      var _ref, _ref1;
      if ((_ref = this.statisticSubscription) != null) {
        _ref.dispose();
      }
      return (_ref1 = scope.gameoverSubscription) != null ? _ref1.dispose() : void 0;
    };

    return HeaderDirective;

  })(base.BaseDirective);
  return exports = {
    HeaderDirective: HeaderDirective
  };
});