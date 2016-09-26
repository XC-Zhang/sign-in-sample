angular
    .module("App", ["ui.router", "ngMaterial"])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state({
            name: "signin",
            url: "/signin",
            templateUrl: "/partials/signin.html",
            controller: "signinController"
        }).state({
            name: "home",
            url: "/",
            controller: "homeController",
            templateUrl: "/partials/home.html",
            resolve: {
                currentUser: function (User) {
                    return User.current;
                }
            }
        }).state({
            name: "home.detail",
            url: "detail",
            templateUrl: "/partials/detail.html",
        });
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    })
    .factory("User", function ($http) {
        var User = function () {
            this.username = "";
            this.password = "";
        };
        User.current = null;
        User.prototype.signin = function () {
            return $http.post("/signin", this).then(function (response) {
                User.current = angular.merge(this, response.data);
            });
        };
        return User;
    })
    .controller("signinController", function ($scope, $http, $state, User) {
        $scope.user = new User();
        $scope.submit = function () {
            $scope.user.signin().then(function () {
                $state.go("home");
            });
        };
    })
    .controller("homeController", function ($scope, $state, currentUser) {
        if (!currentUser) {
            $state.go("signin");
        }
        $scope.user = currentUser;
    });