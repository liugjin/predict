// Generated by IcedCoffeeScript 108.0.13
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var NotificationDirective, exports;
  NotificationDirective = (function(_super) {
    __extends(NotificationDirective, _super);

    function NotificationDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.setRule = __bind(this.setRule, this);
      this.loadRules = __bind(this.loadRules, this);
      this.show = __bind(this.show, this);
      NotificationDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.id = "notification";
      this.equipments = {};
    }

    NotificationDirective.prototype.setScope = function() {};

    NotificationDirective.prototype.setCSS = function() {
      return css;
    };

    NotificationDirective.prototype.setTemplate = function() {
      return view;
    };

    NotificationDirective.prototype.show = function(scope, element, attrs) {
      var i, mvtype, rule, stations, types, _i, _len;
      scope.cates = [
        {
          name: '邮件',
          type: 'email',
          img: 'image/yj.jpg'
        }, {
          name: '微信',
          type: 'wechat',
          img: 'image/yj.jpg'
        }, {
          name: '云短信',
          type: 'cloudsms',
          img: 'image/yj.jpg'
        }
      ];
      scope.cate = scope.cates[0].type;
      scope.equipments = [];
      rule = {};
      rule.allEventPhases = true;
      rule.allEventTypes = true;
      stations = _.map(scope.project.stations.items, (function(_this) {
        return function(s) {
          return {
            name: s.model.name,
            station: s.model.station,
            checked: false
          };
        };
      })(this));
      scope.stations = stations;
      scope.station_all_select = false;
      scope.station_all_select_chan = (function(_this) {
        return function() {
          if (scope.station_all_select) {
            _.each(scope.stations, function(u) {
              return u.checked = true;
            });
          } else {
            _.each(scope.stations, function(u) {
              return u.checked = false;
            });
          }
          return _this.setEquipments(scope);
        };
      })(this);
      scope.station_select_chan = (function(_this) {
        return function() {
          var cs;
          cs = _.map(scope.stations, function(u) {
            return !u.checked;
          });
          if (_.indexOf(cs, true) < 0) {
            scope.station_all_select = true;
          } else {
            scope.station_all_select = false;
          }
          return _this.setEquipments(scope);
        };
      })(this);
      types = _.map(scope.project.dictionary.equipmenttypes.items, (function(_this) {
        return function(s) {
          return {
            name: s.model.name,
            type: s.model.type,
            checked: false
          };
        };
      })(this));
      mvtype = [];
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        i = types[_i];
        if (i.type === "mv") {
          mvtype.push(i);
        }
      }
      scope.types = mvtype;
      scope.type_all_select = false;
      scope.type_all_select_chan = (function(_this) {
        return function() {
          if (scope.type_all_select) {
            return _.each(scope.types, function(u) {
              return u.checked = true;
            });
          } else {
            return _.each(scope.types, function(u) {
              return u.checked = false;
            });
          }
        };
      })(this);
      scope.type_select_chan = (function(_this) {
        return function() {
          var cs;
          cs = _.map(scope.types, function(u) {
            return !u.checked;
          });
          if (_.indexOf(cs, true) < 0) {
            return scope.type_all_select = true;
          } else {
            return scope.type_all_select = false;
          }
        };
      })(this);
      _.each(scope.project.stations.items, (function(_this) {
        return function(s) {
          return _this.getEquipments(s, function(equips) {
            return _this.equipments[s.model.station] = equips;
          });
        };
      })(this));
      scope.equipment_all_select = false;
      scope.equipment_all_select_chan = (function(_this) {
        return function() {
          if (scope.equipment_all_select) {
            return _.each(scope.equipments, function(u) {
              return u.checked = true;
            });
          } else {
            return _.each(scope.equipments, function(u) {
              return u.checked = false;
            });
          }
        };
      })(this);
      scope.equipment_select_chan = (function(_this) {
        return function() {
          var cs;
          cs = _.map(scope.equipments, function(u) {
            return !u.checked;
          });
          if (_.indexOf(cs, true) < 0) {
            return scope.equipment_all_select = true;
          } else {
            return scope.equipment_all_select = false;
          }
        };
      })(this);
      this.geteventSeverities(scope, (function(_this) {
        return function(res) {
          scope.eventSeverities = res;
          scope.eventSeveritie_all_select = false;
          scope.eventSeveritie_all_select_chan = function() {
            if (scope.eventSeveritie_all_select) {
              return _.each(scope.eventSeverities, function(u) {
                return u.checked = true;
              });
            } else {
              return _.each(scope.eventSeverities, function(u) {
                return u.checked = false;
              });
            }
          };
          return scope.eventSeveritie_select_chan = function() {
            var cs;
            cs = _.map(scope.eventSeverities, function(u) {
              return !u.checked;
            });
            if (_.indexOf(cs, true) < 0) {
              return scope.eventSeveritie_all_select = true;
            } else {
              return scope.eventSeveritie_all_select = false;
            }
          };
        };
      })(this));
      this.getRoles(scope, (function(_this) {
        return function(roles) {
          return _this.getUsers(scope, roles, function(users) {
            scope.users = users;
            _this.loadRules(scope);
            scope.user_all_select = false;
            scope.user_all_select_chan = function() {
              if (scope.user_all_select) {
                return _.each(scope.users, function(u) {
                  return u.checked = true;
                });
              } else {
                return _.each(scope.users, function(u) {
                  return u.checked = false;
                });
              }
            };
            return scope.user_select_chan = function() {
              var cs;
              cs = _.map(scope.users, function(u) {
                return !u.checked;
              });
              if (_.indexOf(cs, true) < 0) {
                return scope.user_all_select = true;
              } else {
                return scope.user_all_select = false;
              }
            };
          });
        };
      })(this));
      scope.save = (function(_this) {
        return function() {
          var filterEquipments, filterStations, filterTypes, filterUsers, filtereventSeverities, save_api, users;
          if (scope.user_all_select) {
            users = ["_all"];
          } else {
            filterUsers = _.filter(scope.users, function(item) {
              return item.checked;
            });
            users = _.map(filterUsers, function(item) {
              return item.user;
            });
          }
          if (scope.station_all_select) {
            rule.allStations = true;
          } else {
            delete rule.allStations;
            filterStations = _.filter(scope.stations, function(item) {
              return item.checked;
            });
            rule.stations = _.map(filterStations, function(item) {
              return item.station;
            });
          }
          if (scope.type_all_select) {
            rule.allEquipmentTypes = true;
          } else {
            delete rule.allEquipmentTypes;
            filterTypes = _.filter(scope.types, function(item) {
              return item.checked;
            });
            rule.equipmentTypes = _.map(filterTypes, function(item) {
              return item.type;
            });
          }
          if (scope.equipment_all_select) {
            rule.allEquipments = true;
          } else {
            delete rule.allEquipments;
            filterEquipments = _.filter(scope.equipments, function(item) {
              return item.checked;
            });
            rule.equipments = _.map(filterEquipments, function(item) {
              return item.equipment;
            });
          }
          if (scope.eventSeveritie_all_select) {
            rule.allEventSeverities = true;
          } else {
            delete rule.allEventSeverities;
            filtereventSeverities = _.filter(scope.eventSeverities, function(item) {
              return item.checked;
            });
            rule.eventSeverities = _.map(filtereventSeverities, function(item) {
              return item.severity;
            });
          }
          save_api = {
            id: 'notificationrules',
            item: {
              user: scope.project.model.user,
              project: scope.project.model.project,
              notification: "notification-" + scope.cate,
              content: "中文测试消息",
              contentType: "template",
              delay: 0,
              enable: true,
              events: [],
              index: 0,
              name: "" + scope.cate + "-notification",
              phase: "start",
              priority: 0,
              processors: [],
              repeatPeriod: 0,
              repeatTimes: 0,
              rule: rule,
              ruleType: "complex",
              timeout: 2,
              title: "test notification",
              type: scope.cate,
              users: users,
              visible: true
            }
          };
          return _this.commonService.modelEngine.modelManager.getService(save_api.id).save(save_api.item, function(e, res) {
            if (res && res._id) {
              return _this.display("保存告警模板成功", 10000);
            }
          });
        };
      })(this);
      return scope.cates_chan = (function(_this) {
        return function() {
          return _this.loadRules(scope);
        };
      })(this);
    };

    NotificationDirective.prototype.loadRules = function(scope) {
      var notificationrules_api;
      scope.user_all_select = false;
      scope.station_all_select = false;
      scope.type_all_select = false;
      scope.equipment_all_select = false;
      _.each(scope.users, (function(_this) {
        return function(item) {
          return item.checked = false;
        };
      })(this));
      _.each(scope.stations, (function(_this) {
        return function(item) {
          return item.checked = false;
        };
      })(this));
      _.each(scope.types, (function(_this) {
        return function(item) {
          return item.checked = false;
        };
      })(this));
      _.each(scope.equipments, (function(_this) {
        return function(item) {
          return item.checked = false;
        };
      })(this));
      _.each(scope.eventSeverities, (function(_this) {
        return function(item) {
          return item.checked = false;
        };
      })(this));
      notificationrules_api = {
        id: 'notificationrules',
        query: {
          user: scope.project.model.user,
          project: scope.project.model.project,
          notification: "notification-" + scope.cate
        }
      };
      return this.commonService.modelEngine.modelManager.getService(notificationrules_api.id).get(notificationrules_api.query, (function(_this) {
        return function(e, res) {
          if (res.users && res.rule) {
            return _this.setRule(scope, res);
          }
        };
      })(this), true);
    };

    NotificationDirective.prototype.setRule = function(scope, res) {
      if (res.users[0]) {
        if (res.users[0] === "_all") {
          scope.user_all_select = true;
          _.each(scope.users, (function(_this) {
            return function(item) {
              return item.checked = true;
            };
          })(this));
        } else {
          scope.user_all_select = false;
          _.each(scope.users, (function(_this) {
            return function(item) {
              return _.each(res.users, function(u) {
                if (item.user === u) {
                  return item.checked = true;
                }
              });
            };
          })(this));
        }
      } else {
        scope.user_all_select = false;
      }
      if (res.rule.allStations) {
        scope.station_all_select = true;
        _.each(scope.stations, (function(_this) {
          return function(item) {
            return item.checked = true;
          };
        })(this));
      } else if (res.rule.stations) {
        scope.station_all_select = false;
        _.each(scope.stations, (function(_this) {
          return function(item) {
            return _.each(res.rule.stations, function(i) {
              if (item.station === i) {
                return item.checked = true;
              }
            });
          };
        })(this));
      }
      if (res.rule.allEquipmentTypes) {
        scope.type_all_select = true;
        _.each(scope.types, (function(_this) {
          return function(item) {
            return item.checked = true;
          };
        })(this));
      } else if (res.rule.equipmentTypes) {
        scope.type_all_select = false;
        _.each(scope.types, (function(_this) {
          return function(item) {
            return _.each(res.rule.equipmentTypes, function(i) {
              if (item.type === i) {
                return item.checked = true;
              }
            });
          };
        })(this));
      }
      this.setEquipments(scope);
      if (res.rule.allEquipments) {
        scope.equipment_all_select = false;
        _.each(scope.equipments, (function(_this) {
          return function(item) {
            return item.checked = true;
          };
        })(this));
      } else if (res.rule.equipments) {
        scope.equipment_all_select = false;
        _.each(scope.equipments, (function(_this) {
          return function(item) {
            return _.each(res.rule.equipments, function(i) {
              if (item.equipment === i) {
                return item.checked = true;
              }
            });
          };
        })(this));
      }
      if (res.rule.allEventSeverities) {
        scope.eventSeveritie_all_select = true;
        return _.each(scope.eventSeverities, (function(_this) {
          return function(item) {
            return item.checked = true;
          };
        })(this));
      } else if (res.rule.eventSeverities) {
        scope.eventSeveritie_all_select = false;
        return _.each(scope.eventSeverities, (function(_this) {
          return function(item) {
            return _.each(res.rule.eventSeverities, function(i) {
              if (item.severity === i.toString()) {
                return item.checked = true;
              }
            });
          };
        })(this));
      }
    };

    NotificationDirective.prototype.getRoles = function(scope, callback) {
      var roles_api;
      roles_api = {
        id: 'roles',
        query: {
          user: scope.project.model.user,
          project: scope.project.model.project
        },
        field: null
      };
      return this.commonService.modelEngine.modelManager.getService(roles_api.id).query(roles_api.query, roles_api.field, (function(_this) {
        return function(e, rs) {
          var res, union;
          res = _.map(rs, function(r) {
            return r.users;
          });
          union = _.union(_.flatten(res));
          return typeof callback === "function" ? callback(union) : void 0;
        };
      })(this), true);
    };

    NotificationDirective.prototype.getUsers = function(scope, roles, callback) {
      if (_.indexOf(roles, "_all" >= 0)) {
        return this.commonService.modelEngine.modelManager.getService("users").query(null, null, (function(_this) {
          return function(e, rs) {
            var res;
            res = _.map(rs, function(r) {
              return {
                name: r.name,
                user: r.name,
                checked: false
              };
            });
            return typeof callback === "function" ? callback(res) : void 0;
          };
        })(this));
      } else {
        return typeof callback === "function" ? callback(roles) : void 0;
      }
    };

    NotificationDirective.prototype.getEquipments = function(station, callback) {
      return station.loadEquipments(null, null, (function(_this) {
        return function(err, equipments) {
          var equips;
          equips = _.map(equipments, function(e) {
            return {
              name: e.model.name,
              equipment: e.model.equipment,
              checked: false
            };
          });
          return typeof callback === "function" ? callback(equips) : void 0;
        };
      })(this), true);
    };

    NotificationDirective.prototype.geteventSeverities = function(scope, callback) {
      var eventSeverities_api;
      eventSeverities_api = {
        id: 'eventseverities',
        query: {
          user: scope.project.model.user,
          project: scope.project.model.project
        },
        field: null
      };
      return this.commonService.modelEngine.modelManager.getService(eventSeverities_api.id).query(eventSeverities_api.query, eventSeverities_api.query.field, (function(_this) {
        return function(e, rs) {
          var res;
          res = _.map(rs, function(r) {
            return {
              name: r.name,
              severity: r.severity.toString(),
              checked: false
            };
          });
          return typeof callback === "function" ? callback(res) : void 0;
        };
      })(this), true);
    };

    NotificationDirective.prototype.setEquipments = function(scope) {
      var filterStations, mapStations;
      filterStations = _.filter(scope.stations, (function(_this) {
        return function(s) {
          return s.checked;
        };
      })(this));
      mapStations = _.map(filterStations, (function(_this) {
        return function(s) {
          return _this.equipments[s.station] || [];
        };
      })(this));
      scope.equipments = _.union(_.flatten(mapStations));
      return this.$timeout((function(_this) {
        return function() {
          var cs;
          cs = _.map(scope.equipments, function(u) {
            return !u.checked;
          });
          if (cs.length === 0) {
            return scope.equipment_all_select = false;
          } else {
            if (_.indexOf(cs, true) < 0) {
              return scope.equipment_all_select = true;
            } else {
              return scope.equipment_all_select = false;
            }
          }
        };
      })(this), 0);
    };

    NotificationDirective.prototype.resize = function(scope) {};

    NotificationDirective.prototype.dispose = function(scope) {};

    return NotificationDirective;

  })(base.BaseDirective);
  return exports = {
    NotificationDirective: NotificationDirective
  };
});