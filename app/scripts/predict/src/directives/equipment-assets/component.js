// Generated by IcedCoffeeScript 108.0.13

/*
* File: equipment-assets-directive
* User: David
* Date: 2020/02/12
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var EquipmentAssetsDirective, exports;
  EquipmentAssetsDirective = (function(_super) {
    __extends(EquipmentAssetsDirective, _super);

    function EquipmentAssetsDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "equipment-assets";
      EquipmentAssetsDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    EquipmentAssetsDirective.prototype.setScope = function() {};

    EquipmentAssetsDirective.prototype.setCSS = function() {
      return css;
    };

    EquipmentAssetsDirective.prototype.setTemplate = function() {
      return view;
    };

    EquipmentAssetsDirective.prototype.show = function(scope, element, attrs) {};

    EquipmentAssetsDirective.prototype.resize = function(scope) {};

    EquipmentAssetsDirective.prototype.dispose = function(scope) {};

    return EquipmentAssetsDirective;

  })(base.BaseDirective);
  return exports = {
    EquipmentAssetsDirective: EquipmentAssetsDirective
  };
});