// Generated by IcedCoffeeScript 108.0.13

/*
* File: equipment-property-directive
* User: James
* Date: 2019/03/24
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var EquipmentPropertyDirective, exports;
  EquipmentPropertyDirective = (function(_super) {
    __extends(EquipmentPropertyDirective, _super);

    function EquipmentPropertyDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "equipment-property";
      EquipmentPropertyDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    EquipmentPropertyDirective.prototype.setScope = function() {};

    EquipmentPropertyDirective.prototype.setCSS = function() {
      return css;
    };

    EquipmentPropertyDirective.prototype.setTemplate = function() {
      return view;
    };

    EquipmentPropertyDirective.prototype.show = function(scope, element, attrs) {
      var _ref;
      scope.isMore = false;
      scope.info = '更多信息';
      scope.currEquipment = this.currEquipment = null;
      scope.moreMessage = function() {
        scope.isMore = !scope.isMore;
        if (scope.isMore) {
          return this.info = '隐藏信息';
        } else {
          return this.info = '更多信息';
        }
      };
      scope.filterItems = function() {
        return function(item) {
          if (item.model.dataType === "json" || item.model.dataType === "script" || item.model.dataType === "html" || item.model.visible === false) {
            return false;
          }
          if (item.model.property === 'equipment-model' || item.model.name === '设备型号') {
            return true;
          }
          if (item.model.property === 'serial-number' || item.model.name === '序列号') {
            return true;
          }
          if (item.model.property === 'asserts-code' || item.model.name === '资产编码') {
            return true;
          }
          if (item.model.property === 'equip-ip' || item.model.name === '设备地址') {
            return true;
          }
          if (item.model.property === 'maintainer' || item.model.name === '维护人') {
            return true;
          }
          if (item.model.property === 'electronic-label' || item.model.name === '电子标签') {
            return true;
          }
          if (item.model.property === 'remark' || item.model.name === '设备高度') {
            return true;
          }
          if (item.model.property === 'equip-ip' || item.model.name === '备注信息') {
            return true;
          }
          if (item.model.property === 'production-time' || item.model.name === '生产日期') {
            return true;
          }
          if (item.model.property === 'buy-date' || item.model.name === '购买日期') {
            return true;
          }
          if (item.model.property === 'install-date' || item.model.name === '安装日期') {
            return true;
          }
          return false;
        };
      };
      scope.filterItems2 = function() {
        return function(item) {
          if (item.model.dataType === "json" || item.model.dataType === "script" || item.model.dataType === "html" || item.model.visible === false) {
            return false;
          }
          if (item.model.property === 'equipment-model' || item.model.name === '设备型号') {
            return false;
          }
          if (item.model.property === 'serial-number' || item.model.name === '序列号') {
            return false;
          }
          if (item.model.property === 'asserts-code' || item.model.name === '资产编码') {
            return false;
          }
          if (item.model.property === 'equip-ip' || item.model.name === '设备地址') {
            return false;
          }
          if (item.model.property === 'maintainer' || item.model.name === '维护人') {
            return false;
          }
          if (item.model.property === 'electronic-label' || item.model.name === '电子标签') {
            return false;
          }
          if (item.model.property === 'remark' || item.model.name === '设备高度') {
            return false;
          }
          if (item.model.property === 'equip-ip' || item.model.name === '备注信息') {
            return false;
          }
          if (item.model.property === 'production-time' || item.model.name === '生产日期') {
            return false;
          }
          if (item.model.property === 'buy-date' || item.model.name === '购买日期') {
            return false;
          }
          if (item.model.property === 'install-date' || item.model.name === '安装日期') {
            return false;
          }
          return true;
        };
      };
      if ((_ref = this.subEquipProperty) != null) {
        _ref.dispose();
      }
      return this.subEquipProperty = this.commonService.subscribeEventBus('equipmentId', (function(_this) {
        return function(d) {
          var filter, stationResult;
          if (d) {
            if (d.message.equipmentId.station) {
              stationResult = _.filter(scope.project.stations.items, function(item) {
                return item.model.station === d.message.equipmentId.station;
              });
              if (stationResult.length > 0) {
                _this.currStation = stationResult[0];
                filter = scope.project.getIds();
                filter.equipment = d.message.equipmentId.equipment;
                return _this.currStation.loadEquipments(filter, null, function(err, equipDatas) {
                  if (equipDatas) {
                    return equipDatas[0].loadProperties(null, function(err, prorpertDatas) {
                      scope.currEquipment = _this.currEquipment = equipDatas[0];
                      return console.info(scope.currEquipment);
                    });
                  }
                });
              }
            }
          }
        };
      })(this));
    };

    EquipmentPropertyDirective.prototype.resize = function(scope) {};

    EquipmentPropertyDirective.prototype.dispose = function(scope) {};

    return EquipmentPropertyDirective;

  })(base.BaseDirective);
  return exports = {
    EquipmentPropertyDirective: EquipmentPropertyDirective
  };
});