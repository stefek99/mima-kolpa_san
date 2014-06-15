app.controller("ctrl", function($scope, $interval, statuses, dataservice) {
	$scope.statuses = statuses;
	$scope.itemsnew = [];
	$scope.itemsold = [];

	dataservice.getItems().then(function(actual) {
		$scope.itemsnew = actual.filter(function(obj) { return obj.status === statuses.newitem; });
		$scope.itemsold = actual.filter(function(obj) { return obj.status !== statuses.newitem; });
	});

	// Watching collection to see if there are any items who are not longer in 'itemnew' state
	// Potentially can be better by propagating event (technical details)
	$scope.$watch('itemsnew', function () {
		for(var i=0; i<$scope.itemsnew.length; i++) {
			if($scope.itemsnew[i].status !== statuses.newitem) {
				$scope.itemsold.push($scope.itemsnew[i]);
				$scope.itemsnew.splice(i, 1);
			}
		}
	}, true);

	$scope.defaultOptions = {
		connectWith: ".connectMe",
	    placeholder: "classAppliedWhileDragged",
	    axis: 'y'
	}

	$scope.toPlanOptions = $.extend($scope.defaultOptions, {
		update: function(event, ui) {
	      // as per current implementaion: do not allow dropping items from top to bottom
	      if (ui.item.sortable.droptarget.hasClass("toWork") && ui.item.scope() && ui.item.scope().item.status === statuses.newitem) {
	        ui.item.sortable.cancel();
	      };

	      // when dropping from bottom to top set status to 'newitem'
	      if(ui.item.sortable.droptarget.hasClass("toPlan") && ui.item.scope() && ui.item.scope().item.status !== statuses.newitem) {
	      	ui.item.scope().item.status = statuses.newitem;
	      }
	    }
	});		

	$scope.format = function(obj) {
		return JSON.stringify(angular.copy(obj), null, 2);
	}

	$scope.addItem = function() {
		if($scope.newitem.trim().length === 0) return;

		var item = {
			name : $scope.newitem,
			status : statuses.newitem
		};

		$scope.itemsnew.push(item);
		$scope.newitem = "";
	}


	var previousItems = [];
	var _updateServerEvery1000ms = function() {
		var items = angular.copy($scope.itemsnew).concat(angular.copy($scope.itemsold));

		if (angular.equals(items, previousItems)) {
			// do nothing
		} else {
			dataservice.saveItems(items);
			previousItems = items;
		}
	}

	var intervalID = $interval(_updateServerEvery1000ms, 1000);

	$scope.$on("$destroy", function() {
		$interval.cancel(intervalID);
	});
});