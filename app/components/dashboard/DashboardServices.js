(function(){
  'use strict';

  angular
    .module('res')
    .factory('DashboardFactory', DashboardFactory);

  function DashboardFactory(){
    return {
      resistances: resistances,
      colors: colors
    };

    function resistances(){
      var data = {
        'rings': ['#000000', '#A1887F', '#E57373', '#FFB74D', '#FFF176', '#81C784', '#64B5F6', '#BA68C8', '#E0E0E0', '#FFFFFF'],
        'multipliers': ['#000000', '#A1887F', '#E57373', '#FFB74D', '#FFF176', '#81C784', '#64B5F6', '#BA68C8'],
        'tollerances': {
            5: '#F6DB18',
            10: '#DCDCDC',
            25: '#FFDDBA'
        }
      };

      return data;
    }

    function colors(){
      var colors = {
        '#000000': "Black",
        '#A1887F': "Brown",
        '#E57373': "Red",
        '#FFB74D': "Orange",
        '#FFF176': "Yellow",
        '#81C784': "Green",
        '#64B5F6': "Blue",
        '#BA68C8': "Violet",
        '#E0E0E0': "Grey",
        '#FFFFFF': "White",
        '#F6DB18': "Gold",
        '#DCDCDC': "Grey",
        '#FFDDBA': "Empty"
      };
      return colors;
    }
  }
})();
