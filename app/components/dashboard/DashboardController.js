(function(){
  'use strict'

  angular
    .module('res')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['DashboardFactory', '$mdDialog'];

  function DashboardController(DashboardFactory, $mdDialog){
    var self = this;
    var resistances = DashboardFactory.resistances();

    self.calculate = calculate
    self.tollerances = resistances.tollerances;
    self.colors = DashboardFactory.colors();
    self.res = {};
    self.result = [];

    function calculate(){
      //reset values
      self.result = [];

      var values = self.res.value;
      var tollerance = self.res.tollerance;

      if(typeof values == 'undefined'){
        alert_error("Resistor too low", "You must insert a resistor grater then 100.");
        return;
      }

      if(typeof tollerance == 'undefined'){
        alert_error("Tollerance not specified", "You must select at least one tollerance value.");
        return;
      }

      var values_str = values.toString();
      var values_length = values_str.length;

      var rings = values_str.substring(0,2);
      var rings_length = rings.length;

      var multiplier = values_length - rings_length;

      //add rings
      for(var i = 0; i < rings_length; i++) self.result.push(resistances.rings[rings[i]]);

      //add multiplier
      self.result.push(resistances.multipliers[multiplier]);

      //add tollerance
      self.result.push(resistances.tollerances[tollerance]);

      console.log(self.result);
    }

    function alert_error(title, message){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(title)
          .textContent(message)
          .ariaLabel(title)
          .ok('Continue')
      );
    }
  }
})()
