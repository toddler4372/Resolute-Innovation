var searchApp = angular.module('searchApp', ['ui.bootstrap', 'ngSanitize', 'ngAnimate']).config(
    function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

searchApp.controller('mainController', function ($scope, $rootScope, $http, $location, $window, $timeout) {
    $scope.formData = {};
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.formData.page);
        $scope.fetchRecords();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.addThing = function(a, b) {
        $scope.formData.query = $scope.formData.query + ' ' + a + ':"' + b + '"'
    };

    $scope.search = function() {
        $window.location = "/?q=" + $scope.formData.query;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.formData.page);
        $scope.fetchRecords();
    };

    $scope.fetchRecords = function() {
        $scope.statusText = 'Searching...';
        var start = new Date().getTime();
        var elapsed = '0.0';
        console.log("Fetching");
        var req = '/search?q=' + escape($scope.formData.query) + "&p=" + escape($scope.formData.page);
        if ($scope.formData.query.startsWith("debug")) {
            req = '/debug?s=' + escape($scope.formData.query.split(':')[1])
        }
        $http.get(req).success(function(data) {
            $scope.delay = (new Date().getTime() - start) / 1000.0;
            $scope.totalItems = data.totalItems;
            $scope.facets = data.facets;
            $scope.itemsPerPage = data.itemsPerPage
            $scope.from_ = data.from_ + Math.min(data.results.length, 1);
            $scope.to_ = data.from_ + data.results.length;
            $scope.errorText = data.error;
            $scope.statusText = '';
            for (var i = 0; i < data.results.length; i++) {
                data.results[i].full = false;
            }
            $scope.results = data.results;
            console.log("Fetched");
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        })
        .error(function(data) {
            $scope.totalItems = 0;
            $scope.errorText = "Internal Error";
            $scope.statusText = '';
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    };

    $scope.showFull = function(result) {
        var show = true;
        if (result.full == true) {
            show = false;
        }
        var oldShownResult = -1;
        for (var i = 0; i < $scope.results.length; i++) {
            if ($scope.results[i].full) {
                oldShownResult = i;
            }
            $scope.results[i].full = false;
        }
        if (show) {
        result.full = true;
        }

        $timeout(function() {
            (function($) {
                $(document).ready(function() {
                    if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
                        $('html, body').scrollTop($('#result' + result.id).offset().top) - 20;
                    } else {
                        $('html, body').animate({
                            'scrollTop': $('#result' + result.id).offset().top - 20
                        }, 500);
                    }
                });
            })(jQuery);
        });
    };
    $rootScope.$on('$locationChangeSuccess', function(event){
        if ($location.search().q) {
            $scope.formData.query = $location.search().q;
            $scope.formData.page = 1;
            $scope.activeQuery = $scope.formData.query;
            $scope.fetchRecords();
        } else {
            $scope.activeQuery = false;
        }
    });
});
