(function(){
  'use strict'

  angular
    .module('res', [
      'ngMaterial',
      'ui.router'
    ])
    .constant('api', {
      'APP_PATH': 'app/',
      'DB_HOST': 'http://127.0.0.1:5984/',
      'DB_NAME': 'temperatures/'
    })

})()
