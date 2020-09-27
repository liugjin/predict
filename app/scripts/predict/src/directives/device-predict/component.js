// Generated by IcedCoffeeScript 108.0.13

/*
* File: device-predict-directive
* User: David
* Date: 2019/12/24
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var DevicePredictDirective, exports;
  DevicePredictDirective = (function(_super) {
    __extends(DevicePredictDirective, _super);

    function DevicePredictDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "device-predict";
      DevicePredictDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    DevicePredictDirective.prototype.setScope = function() {};

    DevicePredictDirective.prototype.setCSS = function() {
      return css;
    };

    DevicePredictDirective.prototype.setTemplate = function() {
      return view;
    };

    DevicePredictDirective.prototype.show = function(scope, element, attrs) {
      var clickTime, getTemplates, publishEquipmentId, showStation;
      scope.parents = [];
      scope.project.loadEquipmentTemplates({}, null);
      scope.defaultName = "默认场景";
      scope.focus = 3;
      scope.showDevice = true;
      scope.project.loadStations(null, (function(_this) {
        return function(err, stations) {
          var dataCenters;
          console.log(stations);
          dataCenters = _.filter(stations, function(sta) {
            return sta.model.group !== "datacenter";
          });
          console.log(dataCenters);
          scope.stations = dataCenters;
          scope.station = dataCenters[0];
          return scope.parents = [];
        };
      })(this));
      publishEquipmentId = (function(_this) {
        return function(scope) {
          var _ref, _ref1;
          scope.templateDatas = {
            equipment: (_ref = scope.equipment.model) != null ? _ref.equipment : void 0,
            station: (_ref1 = scope.equipment.model) != null ? _ref1.station : void 0
          };
          scope.project.loadEquipmentTemplates({
            template: scope.equipment.model.template
          }, '', function(err, template) {
            scope.templateId = template[0].model.graphic;
            return scope.scene = _this.getComponentPath("./files/" + scope.equipment.model.type + ".json");
          });
          return _this.commonService.publishEventBus("equipmentInfo", scope.templateDatas);
        };
      })(this);
      showStation = (function(_this) {
        return function(scope) {
          var filter;
          scope.parents = [];
          filter = scope.parameters.type ? {
            type: scope.parameters.type
          } : null;
          return scope.station.loadEquipments(null, null, function(err, equips) {
            var filtersEquipment;
            if (err) {
              return;
            }
            filtersEquipment = _.filter(equips, function(equip) {
              return equip.model.equipment !== '_station_management';
            });
            filtersEquipment = _.sortBy(filtersEquipment, function(item) {
              return item.model._index;
            });
            scope.equipments = filtersEquipment;
            if (!scope.equipment || scope.equipment.model.station !== scope.station.model.station) {
              scope.equipment = filtersEquipment != null ? filtersEquipment[0] : void 0;
            }
            publishEquipmentId(scope);
            return getTemplates(scope);
          });
        };
      })(this);
      getTemplates = (function(_this) {
        return function(scope) {
          var tem, _i, _len, _ref, _results;
          _ref = scope.equipments;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tem = _ref[_i];
            if (tem.model.type === scope.equipment.model.type) {
              scope.scene = _this.getComponentPath("./files/" + tem.model.type + ".json");
              scope.templateId = tem.model.graphic;
              _results.push(clickTime(scope));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      clickTime = (function(_this) {
        return function(scope) {
          return scope.clickTime = function(i) {
            scope.focus = i;
            if (scope.focus === 1) {
              scope.showDevice = !scope.showDevice;
              if (scope.showDevice) {
                _this.commonService.publishEventBus("blast", {
                  data: i
                });
                scope.defaultName = "爆炸3D";
              } else {
                _this.commonService.publishEventBus("3D", {
                  data: i
                });
                scope.defaultName = "默认场景";
              }
            }
            if (scope.focus === 2) {
              _this.commonService.publishEventBus("rotate", {
                data: i
              });
            }
            if (scope.focus === 3) {
              return _this.commonService.publishEventBus("configuration", {
                data: i
              });
            }
          };
        };
      })(this);
      showStation(scope);
      scope.selectStation = (function(_this) {
        return function(station) {
          scope.station = station;
          return showStation(scope);
        };
      })(this);
      return scope.selectEquipment = (function(_this) {
        return function(equip) {
          console.log(equip);
          scope.equipment = equip;
          return publishEquipmentId(scope);
        };
      })(this);
    };

    DevicePredictDirective.prototype.resize = function(scope) {};

    DevicePredictDirective.prototype.dispose = function(scope) {};

    return DevicePredictDirective;

  })(base.BaseDirective);
  return exports = {
    DevicePredictDirective: DevicePredictDirective
  };
});