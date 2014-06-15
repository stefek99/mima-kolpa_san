// mstefanow: for debugging purposes I ocassionally use global variables
// but then I create only a single object
g = {}
g.host = "http://localhost:1234/"; // So I could use livereload + $http requests

var app = angular.module("app", ['ui.sortable', 'ui.bootstrap', 'ngAnimate']);

app.constant('statuses', {
	newitem : "Do?",
    pass: 'Pass',
    done: 'Done!',
    now: 'Now',
    soon: 'Soon',
    later: 'Later',
    fail: '(fail)',
});