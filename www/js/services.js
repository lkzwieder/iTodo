angular.module('starter.services', [])
   .factory('DataService', function() {
      var _data = {
         backlog: [{
            id: 10,
            title: "Fix helper",
            content: "Clearly the helper is broken",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 11,
            title: "Refactoring TODO app",
            content: "Im wasting time with CSS",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         todo: [{
            id: 0,
            title: "fist issue",
            content: "some content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 1,
            title: "second issue",
            content: "some content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 2,
            title: "third issue",
            content: "some content heresome content heresome content heresome content heresome content heresome content heresome content heresome content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         inProgress: [{
            id: 3,
            title: "forth issue",
            content: "some content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 4,
            title: "fifth issue",
            content: "some content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         done: [{
            id: 5,
            title: "sixth issue",
            content: "some content here",
            deadline: "10/10/2015",
            type: "bug",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }]
      };

      var _maxId = 0;
      var _getMaxId = function() {
         angular.forEach(_data, function(column) {
            var cLen = column.length;
            for(var i = cLen; i--;) {
               if(column[i].id > _maxId) _maxId = column[i].id;
            }
         });
         return _maxId;
      };
      return {
         getColumn: function(column) {
            return _data[column];
         },
         all: function() {
            return _data;
         },
         getTasksByTab: function(tab) {
            return this.all()[tab];
         },
         newTask: function(column, data) {
            if(_maxId) _maxId = _getMaxId();
            data.id = _maxId++;
            _data[column].push(data);
         },
         getTaskById: function(taskId, column) {
            var res = null;
            _data[column].forEach(function(v) {
               if(parseInt(taskId) === v.id) {
                  res = v;
               }
            });
            return res;
         },
         updateTask: function(data, tab) {
            tab = tab || "todo"; //TODO if tab is undefined, iterate over object to find task id
            var tabArr = this.getTasksByTab(tab);
            var tabArrLen = tabArr.length;
            for(var i = tabArrLen; i--;) {
               if(tabArr[i].id === parseInt(data.id)) {
                  tabArr[i] = data;
               }
            }
         },
         removeTask: function(taskId, tab) {
            tab = tab || "todo"; //TODO if tab is undefined, iterate over object to find task id
            this.getTasksByTab.splice(this.getTasksByTab(tab).indexOf(taskId), 1);
         }
      }
   });
