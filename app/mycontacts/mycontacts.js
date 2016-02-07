'use strict';

angular.module('mycontact.mycontacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mycontacts', {
    templateUrl: 'mycontacts/mycontacts.html',
    controller: 'MyContactsCtrl'
  });
}])

.service('validateEmail', ['$log', '$http', '$q', function( $log, $http, $q){
	
	this.search = function (email) {
		
		var defer = $q.defer();

		var config = {
			headers : {
				'Authorization': 'Bearer d12076c58f27ed6945599bf22e58665c',
				"Accept": "application/json"
			}
		}

		var url = "https://person.clearbit.com/v1/people/email/"+email;

		$http
		.get(url, config)
		.then(function(response){
			defer.resolve(response);
		})
		.then(function (response) {
			defer.reject("There was error in request")
		});

		return defer.promise;
	}

}])

.controller('MyContactsCtrl', ['$scope','validateEmail',function($scope, validateEmail) {

	$scope.email_id = "naveendnagendran@gmail.com"
	$scope.getDetails = function (email_id) {
		$scope.results = [];
		$scope.fullname = "";
		$scope.location = "";
		$scope.avatar = "";
		$scope.twitter = "";
		$scope.facebook = "";
		$scope.linkedin = "";
		// https://www.linkedin.com/in/naveennagendran
		validateEmail
					.search($scope.email_id)
					.then(function (response) {
						console.log(response);
						if(response.data.length == 0 ){
							return;
						}

						if(response.data.bio!= ""){
							$scope.bio = response.data.bio;							
						}

						if(response.data.github.avatar!= ""){
							$scope.avatar = response.data.github.avatar;							
						}
						
						if(response.data.name.fullName!= ""){
							$scope.fullname = response.data.name.fullName;							
						}

						if(response.data.gender!= ""){
							$scope.gender = response.data.gender;
						}

						if(response.data.location!= ""){
							$scope.location = response.data.location;
						}

						if(response.data.timeZone!= ""){
							$scope.timeZone = response.data.timeZone; 
						}

						if(response.data.site!= ""){
							$scope.personalWebsite = response.data.site; 
						}

						if(response.data.facebook.handle != null){
							$scope.facebook = "https://www.facebook.com/"+response.data.facebook.handle;
						}

						if(response.data.github.handle != null){
							$scope.github = "https://github.com/"+response.data.github.handle;
						}

						if(response.data.twitter.handle != null){
							$scope.twitter = "https://twitter.com/"+response.data.twitter.handle;
						}

						if(response.data.linkedin.handle != null){
							$scope.linkedin = "https://www.linkedin.com/"+response.data.linkedin.handle;
						}
						
					});
	}


}]);