// Generated by IcedCoffeeScript 108.0.13

/*
* File: pictorial-data-directive
* User: David
* Date: 2020/03/06
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "./swiper/swiper.min"], function(base, css, view, _, moment, swiper) {
  var PictorialDataDeviceDirective, exports;
  window.Swiper = swiper;
  PictorialDataDeviceDirective = (function(_super) {
    __extends(PictorialDataDeviceDirective, _super);

    function PictorialDataDeviceDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.subscribeSignal = __bind(this.subscribeSignal, this);
      this.filterEquipments = __bind(this.filterEquipments, this);
      this.show = __bind(this.show, this);
      this.id = "pictorial-data";
      PictorialDataDeviceDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    PictorialDataDeviceDirective.prototype.setScope = function() {};

    PictorialDataDeviceDirective.prototype.setCSS = function() {
      return css;
    };

    PictorialDataDeviceDirective.prototype.setTemplate = function() {
      return view;
    };

    PictorialDataDeviceDirective.prototype.show = function(scope, element, attrs) {
      scope.setting = setting;
      scope.signals = {};
      scope.signalSubscriptions = {};
      setTimeout((function(_this) {
        return function() {
          var mySwiper;
          return mySwiper = new Swiper('.swiper-container', {
            height: 100,
            slidesPerView: 'auto',
            spaceBetween: 15,
            freeMode: true,
            loop: false,
            observer: true,
            observeParents: true,
            normalizeSlideIndex: false,
            centeredSlides: false
          });
        };
      })(this), 2000);
      scope.devices = {};
      scope.defaultImg = this.getComponentPath("images/device.svg");
      scope.station.loadEquipments({
        type: {
          $nin: ["_management", "_station_management"]
        }
      }, null, (function(_this) {
        return function(err, equips) {
          _this.filterEquipments(scope, equips);
          return scope.selectedType = scope.types[0];
        };
      })(this));
      scope.selectType = function(type) {
        return scope.selectedType = type;
      };
      scope.imgError = function(ele) {
        if (ele.src !== scope.defaultImg) {
          ele.src = scope.defaultImg;
        }
        return ele.onerror = null;
      };
      scope.getColor = function(severity, flag) {
        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
        if (flag) {
          if (severity > 0) {
            return (_ref = scope.project) != null ? (_ref1 = _ref.dictionary) != null ? (_ref2 = _ref1.eventseverities) != null ? (_ref3 = _ref2.getItem(severity)) != null ? _ref3.model.color : void 0 : void 0 : void 0 : void 0;
          }
        } else {
          if (severity === -1) {
            return "black";
          }
          if (severity === 0) {
            return "#10EBF4";
          }
          if (severity > 0) {
            return (_ref4 = scope.project) != null ? (_ref5 = _ref4.dictionary) != null ? (_ref6 = _ref5.eventseverities) != null ? (_ref7 = _ref6.getItem(severity)) != null ? _ref7.model.color : void 0 : void 0 : void 0 : void 0;
          }
        }
      };
      return scope.selectDevice = (function(_this) {
        return function(equipment) {
          scope.device = equipment;
          _this.publishEventBus("equipmentId", {
            stationId: equipment.model.station,
            equipmentId: equipment.model.equipment
          });
          return window.location.hash = "#/device-details/" + scope.project.model.user + "/" + scope.project.model.project + "/" + equipment.model.station + "/" + equipment.model.equipment;
        };
      })(this);
    };

    PictorialDataDeviceDirective.prototype.filterEquipments = function(scope, equips) {
      var equip, key, _i, _len;
      if (scope.parameters.types) {
        equips = _.filter(equips, function(item) {
          var _ref;
          return _ref = item.model.type, __indexOf.call(scope.parameters.types, _ref) >= 0;
        });
      }
      if (scope.parameters.templates) {
        equips = _.filter(equips, function(item) {
          var _ref;
          return _ref = item.model.template, __indexOf.call(scope.parameters.templates, _ref) >= 0;
        });
      }
      for (_i = 0, _len = equips.length; _i < _len; _i++) {
        equip = equips[_i];
        equip.loadSignals();
        key = equip.model.station + "." + equip.model.equipment;
        if (!scope.signals[key]) {
          scope.signals[key] = {
            severity: {
              name: "设备状态",
              value: -2,
              formatValue: "未知"
            }
          };
        }
      }
      scope.devices = _.groupBy(equips, function(item) {
        return item.model.type;
      });
      scope.types = _.filter(scope.project.dictionary.equipmenttypes.items, function(item) {
        return scope.devices[item.model.type] != null;
      });
      scope.types = _.sortBy(scope.types, function(item) {
        return 0 - item.model.index;
      });
      _.each(scope.types, (function(_this) {
        return function(type) {
          return _this.checkNameFile(type.model.name, function(response) {
            return type.model.icon = type.model.name;
          }, function(error) {
            return type.model.icon = "device";
          });
        };
      })(this));
      return setTimeout((function(_this) {
        return function() {
          var signal, signals, _j, _len1, _results;
          if (scope.parameters.signals) {
            signals = scope.parameters.signals;
          } else {
            signals = ["communication-status", "_alarms"];
          }
          _results = [];
          for (_j = 0, _len1 = signals.length; _j < _len1; _j++) {
            signal = signals[_j];
            _results.push(_this.subscribeSignal(scope, signal));
          }
          return _results;
        };
      })(this), 2000);
    };

    PictorialDataDeviceDirective.prototype.checkNameFile = function(name, success, error) {
      return this.commonService.reportingService.$http.get(this.getComponentPath("images/" + name + ".svg")).then(success, error);
    };

    PictorialDataDeviceDirective.prototype.subscribeSignal = function(scope, signal) {
      var filter, _ref;
      if ((_ref = scope.signalSubscriptions[signal]) != null) {
        _ref.dispose();
      }
      filter = scope.project.getIds();
      filter.station = "+";
      filter.equipment = "+";
      filter.signal = signal;
      return scope.signalSubscriptions[signal] = this.commonService.signalLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, d) {
          var key, _ref1;
          signal = scope.project.getSignalByTopic(d.topic);
          if (signal != null) {
            signal.setValue(d.message);
          }
          d.message.name = signal != null ? signal.model.name : void 0;
          d.message.formatValue = signal != null ? signal.data.formatValue : void 0;
          d.message.unitName = (_ref1 = scope.project.typeModels.signaltypes.getItem(d.message.unit)) != null ? _ref1.model.unit : void 0;
          key = d.message.station + "." + d.message.equipment;
          scope.signals[key][d.message.signal] = d.message;
          if (d.message.severity > scope.signals[key].severity.value) {
            scope.signals[key].severity.value = d.message.severity;
            return scope.signals[key].severity.formatValue = (function() {
              var _ref2;
              switch (d.message.severity) {
                case -1:
                  return "通讯中断";
                case 0:
                  return "运行正常";
                default:
                  return (_ref2 = scope.project.typeModels.eventseverities.getItem(d.message.severity)) != null ? _ref2.model.name : void 0;
              }
            })();
          }
        };
      })(this));
    };

    PictorialDataDeviceDirective.prototype.resize = function(scope) {};

    PictorialDataDeviceDirective.prototype.dispose = function(scope) {
      var key, signal, _ref, _results;
      _ref = scope.signalSubscriptions;
      _results = [];
      for (key in _ref) {
        signal = _ref[key];
        _results.push(signal != null ? signal.dispose() : void 0);
      }
      return _results;
    };

    return PictorialDataDeviceDirective;

  })(base.BaseDirective);
  return exports = {
    PictorialDataDeviceDirective: PictorialDataDeviceDirective
  };
});