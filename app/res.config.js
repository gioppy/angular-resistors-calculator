(function(){
  'use strict'

  angular
    .module('res')
    .config(Config);

  Config.$inject = ['$stateProvider', '$urlRouterProvider', 'api'];

  function Config($stateProvider, $urlRouterProvider, api){
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('dashboard', {
        url:"/",
        templateUrl: api.APP_PATH + 'components/dashboard/dashboard.html',
        controller:'DashboardController as main'
      })
  }
})();
