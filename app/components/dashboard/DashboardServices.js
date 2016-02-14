(function(){
  'use strict'

  angular
    .module('res')
    .factory('DashboardFactory', DashboardFactory);

  DashboardFactory.$inject = [];

  function DashboardFactory(){
    return {
      resistances: resistances,
      colors: colors
    }

    function resistances(){
      var data = {
        'rings': ['#000000', '#993302', '#fe0000', '#ff6501', '#ffff01', '#008102', '#0004ff', '#BD10E0', '#9B9B9B', '#ffffff'],
        'multipliers': ['#000000', '#993302', '#fe0000', '#ff6501', '#ffff01', '#008102', '#0004ff', '#BD10E0'],
        'tollerances': {
            5: '#f6db18',
            10: '#dcdcdc',
            25: '#ffddba'
        }
      }

      return data;
    }

    function colors(){
      var colors = {
        '#000000': "Black",
        '#993302': "Brown",
        '#fe0000': "Red",
        '#ff6501': "Orange",
        '#ffff01': "Yellow",
        '#008102': "Green",
        '#0004ff': "Blue",
        '#BD10E0': "Violet",
        '#9B9B9B': "Grey",
        '#ffffff': "White",
        '#f6db18': "Gold",
        '#dcdcdc': "Grey",
        '#ffddba': "Empty"
      }
      return colors;
    }
  }
})();
