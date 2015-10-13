var serverUriGet = "/php/api/get.php";
var serverUriPost = "./php/api/post.php";
var app = angular.module('app', [])
    .controller('phonebookCtrl', function($scope, $http) {
		function saveData() {
			$http({
					method: 'POST',
					url: serverUriPost,
					data: {'contacts' :  $scope.phonebook},
				}).success(function (data) {
					$scope.saveStatus = data;
				}).error(function (data) {
					$scope.saveStatus = data;
				});
		}
		
		function getFields() {
			return {
				
			}
		}
		
        $scope.currentPersonId = -1;
		$http.get(serverUriGet).success(function(response){
			console.log(response.contacts)
			$scope.phonebook = response.contacts;
		});
        $scope.addNewPerson = function() {
            if ($scope.name != '') {
                $scope.phonebook.push({
                    name: $scope.name,
                    phone: $scope.phone,
                    email: $scope.email,
                    skype: $scope.skype,
                    description: $scope.description
                });
				
				saveData();
				
                $scope.name = '';
                $scope.phone = '';
                $scope.email = '';
                $scope.skype = '';
                $scope.description = '';
            }
        }
        $scope.savePerson = function() {
            if ($scope.currentPersonId > -1) {
                var id = $scope.currentPersonId;
                $scope.phonebook[id].name = $scope.name;
                $scope.phonebook[id].phone = $scope.phone;
                $scope.phonebook[id].email = $scope.email;
                $scope.phonebook[id].skype = $scope.skype;
                $scope.phonebook[id].description = $scope.description;

				saveData();
					
                $scope.name = '';
                $scope.phone = '';
                $scope.email = '';
                $scope.skype = '';
                $scope.description = '';
                $scope.currentPersonId = -1;
            }
        }
        $scope.editPerson = function(id) {
            $scope.currentPersonId = id;
            $scope.name = $scope.phonebook[id].name;
            $scope.phone = $scope.phonebook[id].phone;
            $scope.email = $scope.phonebook[id].email;
            $scope.skype = $scope.phonebook[id].skype;
            $scope.description = $scope.phonebook[id].description;
			saveData();
        }
        $scope.deletePerson = function(id) {
            $scope.phonebook.splice(id, 1);
			saveData();
        }
    })