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

     var _getData = function() {
        return JSON.parse(localStorage.getItem('data'));
     };

     var _setData = function(data) {
        localStorage.setItem('data', JSON.stringify(data));
     };

     var _getFromCache = function() {
        var res = _getData();
        if(!res) {
           _setData(_data);
           res = _data;
        }
        return res;
     };

     var _getColumn = function(column) {
        var x = _getFromCache();
        return _getFromCache()[column];
     };

     var _getTaskPosition = function(taskId, column) {
        var res = null;
        _getColumn(column).forEach(function(v, i) {
           if(parseInt(taskId) === v.id) {
              res = i;
           }
        });
        return res;
     };

      return {
         getColumn: _getColumn,
         all: function() {
            return _getFromCache();
         },
         newTask: function(column, data) {
            if(_maxId) _maxId = _getMaxId();
            data.id = _maxId++;
            var all = this.all();
            all[column].push(data);
            _setData(all);
         },
         getTaskById: function(taskId, column) {
            console.log(_getTaskPosition(taskId, column));
            return this.getColumn(column)[_getTaskPosition(taskId, column)];
         },
         updateTask: function(column, data) {
            var d = _getFromCache();
            d[column][_getTaskPosition(data.id, column)] = data;
            _setData(d);
         }
      }
   });

// TODO implement memoize in getColumn, etc.
