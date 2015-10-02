angular.module('starter.services', [])
   .factory('DataService', function() {
      var _data = {
         backlog: [{
            id: 10,
            title: "Fix helper",
            content: "Clearly the helper is broken",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 11,
            title: "Refactoring TODO app",
            content: "Im wasting time with CSS",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         todo: [{
            id: 0,
            title: "fist issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 1,
            title: "second issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 2,
            title: "third issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         inprogress: [{
            id: 3,
            title: "forth issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }, {
            id: 4,
            title: "fifth issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }],
         done: [{
            id: 5,
            title: "sixth issue",
            content: "some content here",
            deadline: "",
            author: "Lucas Tettamanti",
            asigned: "Jonathan"
         }]
      };
      return {
         getBacklog: function() {
            return _data['backlog'];
         },
         all: function() {
            return _data;
         },
         getTasksByTab: function(tab) {
            return this.all()[tab];
         },
         getTaskById: function(taskId, tab) {
            tab = tab || "todo";
            var tabArr = this.getTasksByTab(tab);
            var tabArrLen = tabArr.length;
            for(var i = tabArrLen; i--;) {
               if(tabArr[i].id === parseInt(taskId)) {
                  return tabArr[i];
               }
            }
            return null;
         },
         addTask: function(data, tab) {
            tab = tab || "todo";
            this.getTasksByTab(tab).push(data);
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
