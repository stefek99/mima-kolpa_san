app.factory("dataservice", function($http, $q, statuses) {

	// This is to provide fallback when $http does not work (for instance serving site via file:// protocol)
	var hardcodedData = [
							{"name" : 1, "status": "newitem"},
							{"name" : 2, "status": "pass"},
							{"name" : 3, "status": "done"},
							{"name" : 4, "status": "soon"},
							{"name" : 5, "status": "later"},
							{"name" : 6, "status": "newitem"},
							{"name" : 7, "status": "newitem"}
						];

	var _parseData = function(data) {

		var result = data.map(function(obj) { 
			return { 
				"name" : obj.name, 
				"status" : statuses[obj.status]  // Basically rather than returning string 'newitem' we do a lookup
			}; 
		});

		return result;
	}

	var defer = $q.defer();

	$http({method: 'GET', url: g.host + "data/items.json"})
		.success(function(data, status, headers, config) {
			console.log("getting data from " + g.host);
	        defer.resolve(_parseData(data));
	    })
		.error(function(data, status, headers, config) {
			console.log("getting data locally, but pretending it is asynchronous");
			defer.resolve(_parseData(hardcodedData));
	    });

	var saveItems = function(items) {
		console.log("doing some JSONP magic with items", items);

		// Example from docs: https://docs.angularjs.org/api/ng/service/$http#jsonp
		// $http({method: 'JSONP', url: g.host})
		//     .success(function(data, status) {
		//     })
		//     .error(function(data, status) {
		//  	});

	}

	return {
		getItems : function() { 
			return defer.promise; 
		},
		saveItems : saveItems
	}
});	