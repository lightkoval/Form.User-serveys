/**
 * Created by svetlana on 17.06.2016.
 */
var app = angular.module('app', ['ngRoute']);

app.controller('HomeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    $scope.isActive = function isActive(location) {
        return location === $location.path();
    };

    $rootScope.filled = {
        first: false,
        second: false,
        third: false,
        fourth: false
    }
}]);

app.controller('FirstPageController', ['$rootScope', '$scope', '$location', '$route', function ($rootScope, $scope, $location, $route) {
    $scope.$route = $route;

    if (localStorage.user) {
        $scope.user = angular.fromJson(localStorage.user);
        $rootScope.filled.first = true;
    }

    $scope.submit = function submit() {
        localStorage.user = angular.toJson({name: $scope.user.name, email: $scope.user.email});
        if ($scope.user.name && $scope.user.email) {
            $location.path('/second');
        }
    };
}]);

app.controller('SecondPageController', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {
    $http.get('data/countries.json').then(function success(response) {
        $scope.countries = response.data;
    });

    $http.get('data/cities.json').then(function success(response) {
        $scope.cities = response.data;
    });

    if (localStorage.location) {
        $rootScope.filled.second = true;
    }

    $scope.saveCountry = function saveCountry() {
        $scope.citiesList = [];
        for (var key in $scope.cities) {
            if ($scope.cities[key].country == $scope.country) {
                $scope.citiesList.push($scope.cities[key]);
            }
        }
    };

    $scope.submit = function submit() {
        console.log($scope.city);
        localStorage.location = angular.toJson({
            country: $scope.countries[$scope.country],
            city: $scope.city.name,
            idCountry: $scope.city.country,
            idCity: $scope.city.$$hashKey
        });
        if ($scope.country && $scope.city) {
            $location.path('/third');
        }
    }
}]);

app.controller('ThirdPAgeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

    if (localStorage.social) {
        $scope.user = angular.fromJson(localStorage.social);


        for (var key in $scope.user) {
            $scope[key] = true;
        }
        $rootScope.filled.third = true;
    }

    $scope.submit = function () {
        localStorage.social = angular.toJson(null);
        if ($scope.user.Facebook || $scope.user.Vkontakte || $scope.user.Twitter || $scope.user.Odnoklassniki) {
            localStorage.social = angular.toJson($scope.user);
        }
        $location.path('/fourth');
    }

}]);

app.controller('FourthPageController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    if (localStorage.img) {
        $rootScope.filled.fourth = true;

    }

    $scope.active = {
        img1: false,
        img2: false,
        img3: false,
        img4: false
    };

    $scope.saveImg = function saveImg(img) {

        switch (img) {
            case 'img/cat1.jpg':
                localStorage.img = angular.toJson(img);
                $scope.active = {
                    img1: true,
                    img2: false,
                    img3: false,
                    img4: false
                };
                break;
            case 'img/cat2.jpg':
                localStorage.img = angular.toJson(img);
                $scope.active = {
                    img1: false,
                    img2: true,
                    img3: false,
                    img4: false
                };
                break;
            case 'img/cat3.jpg':
                localStorage.img = angular.toJson(img);
                $scope.active = {
                    img1: false,
                    img2: false,
                    img3: true,
                    img4: false
                };
                break;
            case 'img/dog4.jpg':
                $scope.active = {
                    img1: false,
                    img2: false,
                    img3: false,
                    img4: true
                };
        }
    };
}]);

app.controller('UserDataController', ['$scope', function ($scope) {

    var user = angular.fromJson(localStorage.user);
    var location = angular.fromJson(localStorage.location);

    $scope.user = {
        name: user.name,
        email: user.email,
        country: location.country,
        city: location.city,
        social: angular.fromJson(localStorage.social),
        img: angular.fromJson(localStorage.img)
    };

    console.log($scope.user);
}]);