var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	// console.log("BooksController loaded...");
// $scope.getBooks = function(){
// 	$http.get('http://localhost:3000/api/books').success(function(response){
// 		$scope.books = response;
// 	});
// 	$http({
//     method: 'get', 
//     url: 'http://localhost:3000/api/books'
// }).then(function (response) {
// 	$scope.books = response;
// },function (error){
//     console.log(error, 'can not get data.');
// });
// }

$scope.getBooks = function() {
        $http.get('/api/books')
            .then(function(response) {
            $scope.books = response.data
        })
    }﻿

    $scope.getBook = function() {
    	// alert("OK");
    	// console.log("OK");	
    	var id = $routeParams.id;
        $http.get('/api/book/'+id)
            .then(function(response) {
            $scope.book = response.data
        })
    }﻿

     $scope.addBook = function() {
        $http.post('/api/books', $scope.book)
            .then(function(response) {
            window.location.href = '#/books';
        })
    }﻿

    $scope.updateBook = function() {
    	var id = $routeParams.id;
        $http.put('/api/books/'+id, $scope.book)
            .then(function(response) {
            window.location.href = '#/books';
        })
    }﻿

    $scope.removeBook = function(id) {
        $http.delete('/api/books/'+id)
            .then(function(response) {
            window.location.href = '#/books';
        })
    }﻿


}]);