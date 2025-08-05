var app = angular.module('counterApp', []);

app.controller('CounterController', function($scope) {
    $scope.counter = 0;

    $scope.increase = function() {
        $scope.counter++;
    };

    $scope.decrease = function() {
        if ($scope.counter > 0) {
            $scope.counter--;
        }
    };

    $scope.reset = function() {
        $scope.counter = 0;
    };
});
