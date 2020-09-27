// Generated by IcedCoffeeScript 108.0.13

/*
* File: work-button-directive
* User: David
* Date: 2019/07/17
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "text!./module.html", "text!./module.css", "text!./tasks.json"], function(base, css, view, _, moment, moduleHtml, moduleCss, json) {
  var WorkButtonDirective, exports;
  WorkButtonDirective = (function(_super) {
    __extends(WorkButtonDirective, _super);

    function WorkButtonDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.loadGroup = __bind(this.loadGroup, this);
      this.show = __bind(this.show, this);
      this.id = "work-button";
      WorkButtonDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    WorkButtonDirective.prototype.setScope = function() {};

    WorkButtonDirective.prototype.setCSS = function() {
      return css;
    };

    WorkButtonDirective.prototype.setTemplate = function() {
      return view;
    };

    WorkButtonDirective.prototype.show = function(scope, element, attrs) {
      var printing, today, valideDate, warpHtml, year;
      today = _.map(moment().format("YYYY-MM-DD").split("-"), function(d) {
        if (d.length === 2 && d[0] === "0") {
          return d[1];
        }
        return d;
      });
      year = parseInt(moment().format("YYYY"));
      scope.queryDay = {
        day: today[2],
        month: today[1],
        year: today[0]
      };
      scope.options = {
        day: [],
        month: _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], function(d) {
          return d;
        }),
        year: _.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], (function(_this) {
          return function(d) {
            return year - d;
          };
        })(this))
      };
      valideDate = (function(_this) {
        return function() {
          var isPass, x, _i, _len, _ref;
          isPass = true;
          _ref = ["day", "month", "year"];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            if (scope.queryDay[x] === "") {
              isPass = false;
              break;
            }
          }
          if (!isPass) {
            M.toast({
              html: '温馨提示：时间不可为空！'
            });
          }
          return isPass;
        };
      })(this);
      scope.changeDays = (function(_this) {
        return function() {
          var count, lastDay, _i, _j, _k, _results, _results1, _results2;
          if (scope.queryDay.year === "" || scope.queryDay.month === "") {
            scope.queryDay.day = "";
            scope.options.day = [];
            scope.$applyAsync();
            return;
          }
          count = scope.options.day.length;
          if (["1", "3", "5", "7", "8", "10", "12"].indexOf(scope.queryDay.month) !== -1 && count !== 31) {
            scope.options.day = _.map((function() {
              _results = [];
              for (_i = 1; _i <= 31; _i++){ _results.push(_i); }
              return _results;
            }).apply(this), function(d) {
              return d;
            });
          } else if (["4", "6", "9", "11"].indexOf(scope.queryDay.month) !== -1 && count !== 30) {
            scope.options.day = _.map((function() {
              _results1 = [];
              for (_j = 1; _j <= 30; _j++){ _results1.push(_j); }
              return _results1;
            }).apply(this), function(d) {
              return d;
            });
          } else if (scope.queryDay.month === "2") {
            lastDay = moment([scope.queryDay.year]).isLeapYear() ? 29 : 28;
            if (count !== lastDay) {
              scope.options.day = _.map((function() {
                _results2 = [];
                for (var _k = 1; 1 <= lastDay ? _k <= lastDay : _k >= lastDay; 1 <= lastDay ? _k++ : _k--){ _results2.push(_k); }
                return _results2;
              }).apply(this), function(d) {
                return d;
              });
            }
          }
          return scope.$applyAsync();
        };
      })(this);
      warpHtml = (function(_this) {
        return function(d, h) {
          var content, counts, datas, html;
          html = _.clone(h);
          content = d.nodes[0].contents[0].content;
          html = html.replace("{{name}}", d.creator.name);
          html = html.replace("{{time}}", moment(d.createtime).format("YYYY-MM-DD HH:mm:ss"));
          counts = {
            ups: 2,
            ac: 3,
            dme: 2,
            th: 7,
            water: 5
          };
          datas = ["ups-alarms", "ups-loadRate", "distributor-alarms", "distributor-voltage", "battery-alarms", "battery-temperature", "battery-humidity", "ac-status", "dme-status", "th-alarms", "th-temperature", "th-humidity", "water-alarms", "distributor-temperature", "distributor-humidity"];
          _.map(datas, function(item) {
            var count, items, replaceVal, x, y, _i, _index, _j, _len, _ref, _ref1, _ref2, _results, _val, _val2;
            items = item.split("-");
            count = _.has(counts, items[0]) ? counts[items[0]] : 1;
            for (x = _i = 1; 1 <= count ? _i <= count : _i >= count; x = 1 <= count ? ++_i : --_i) {
              _index = items[0] === "distributor" || items[0] === "battery" ? items[0] : items[0] + x;
              _val = (_ref = content[_index]) != null ? _ref[items[1]] : void 0;
              replaceVal = "";
              if (typeof _val === "object" && (items[1] === "loadRate" || items[1] === "voltage")) {
                replaceVal = _.max(_.values(_val));
              } else if (typeof _val === "boolean" && items[1] === "alarms") {
                replaceVal = _val ? "告警" : "正常";
              } else if (typeof _val === "string" || typeof _val === "number") {
                replaceVal = _val;
              } else {
                replaceVal = "--";
              }
              html = html.replace("{{" + _index + "-" + items[1] + "}}", replaceVal);
            }
            if (_.has(content, "severities")) {
              _ref1 = [1, 2, 3];
              _results = [];
              for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
                y = _ref1[_j];
                _val2 = (content != null ? (_ref2 = content.severities[y - 1]) != null ? _ref2.value : void 0 : void 0) ? content.severities[y - 1].value : "--";
                _results.push(html = html.replace("{{severities" + y + "-value}}", _val2));
              }
              return _results;
            }
          });
          return html;
        };
      })(this);
      printing = (function(_this) {
        return function(data) {
          var date, html, newWindow, x, _data, _html, _i, _len;
          if (data.length === 0) {
            M.toast({
              html: '温馨提示：无数据！'
            });
            return;
          }
          _html = "";
          _data = _.sortBy(data, function(d) {
            return d.createtime;
          });
          for (_i = 0, _len = _data.length; _i < _len; _i++) {
            x = _data[_i];
            _html += warpHtml(x, moduleHtml);
          }
          date = [scope.queryDay.year, scope.queryDay.month, scope.queryDay.day].join("/");
          html = "<html><head><style type=text/css>" + moduleCss + "</style></head><body onbeforeprint='document.getElementsByTagName(`input`)[0].style.display = `none`' onafterprint='document.getElementsByTagName(`input`)[0].style.display = `inline`'><header><h4>江汉油田数据中心机房巡检记录</h4><div>日期：" + date + "<input type='button' onclick='window.print()' value='打印'/></div></header>" + _html + "</body></html>";
          newWindow = window.open();
          newWindow.document.write(html);
          return newWindow.document.close();
        };
      })(this);
      scope.setQuery = (function(_this) {
        return function(type) {
          var filter, _date;
          $("#tasktime-select").modal('close');
          if (type === -1) {
            return;
          }
          if (type === 0 && valideDate()) {
            filter = scope.project.getIds();
            _date = [scope.queryDay.year, scope.queryDay.month, scope.queryDay.day].join("-");
            filter.createtime = {
              "$lte": moment(new Date(_date)).endOf('day'),
              "$gte": moment(new Date(_date)).startOf('day')
            };
            return _this.loadGroup(filter, function(data) {
              if (!data) {
                return console.error("未查询到数据！！");
              }
              return printing(data);
            });
          }
        };
      })(this);
      return scope.changeDays();
    };

    WorkButtonDirective.prototype.loadGroup = function(param, callback) {
      return this.commonService.loadProjectModelByService('tasks', param, '_id user project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskmodels) {
          if (taskmodels) {
            return callback(taskmodels);
          }
        };
      })(this), true);
    };

    WorkButtonDirective.prototype.resize = function(scope) {};

    WorkButtonDirective.prototype.dispose = function(scope) {};

    return WorkButtonDirective;

  })(base.BaseDirective);
  return exports = {
    WorkButtonDirective: WorkButtonDirective
  };
});