app.directive("myitem", function(statuses) {
	return {
		restrict : "E",
		scope : {
			"item" : "=",
			"statuses" : "="
		},
		template:	"<div>" +
						"{{item.name}}" +
						"<span class='floatright'>" +
							"<dropdown statuses='statuses' item='item'></dropdown>" +
							"<a href ng-click='details.isopen = !details.isopen'>" +
								"<span class='glyphicon glyphicon-chevron-right'></span>" +
							"</a>" +
						"</span>" +
						"<img src='cardview.png' class='animatedimg' ng-if='details.isopen'>" +
					"</div>",
		link: function(scope, elem, attrs) {
			scope.details = {
				isopen: false
			};
		},
	}
});	

app.directive("dropdown", function(statuses) {
	return {
		restrict : "E",
		scope : {
			"item" : "=",
			"statuses" : "="
		},
		template: 
			'    <span class="dropdown" is-open="dropdown.isopen">' +
			'      <a href class="dropdown-toggle">{{item.status}}</a>' +
			'      <ul class="dropdown-menu">' +
			'          <li><a href ng-click="select(statuses.pass)">{{statuses.pass}}</a></li>' +
			'          <li><a href ng-click="select(statuses.done)">{{statuses.done}}</a></li>' +
			'          <li><a href ng-click="select(statuses.now)">{{statuses.now}}</a></li>' +
			'          <li><a href ng-click="select(statuses.soon)">{{statuses.soon}}</a></li>' +
			'          <li><a href ng-click="select(statuses.later)">{{statuses.later}}</a></li>' +
			'          <li><a href ng-click="select(statuses.fail)">{{statuses.fail}}</a></li>' +
			'      </ul>' +
			'    </span>',
		controller: function($scope) {

			$scope.dropdown = {
				isopen: false
			};

			$scope.select = function(status) {
				$scope.item.status = status;
				$scope.dropdown.isopen = false;
			}
		}
	}
});