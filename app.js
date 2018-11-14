(function(){





  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService )
  .directive('foundItems',foundItemsDirective);



  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){

    var nctrl=this;

    nctrl.found=function(){

      var response=MenuSearchService.getMenuItems();
      response.then(function(result){
        //process items and keep only result
        var menu_items=result.data.menu_items;

        var found_items=[];

        for(var i=0;i<menu_items.length;i++){
          var desc=menu_items[i].description;
          if(desc.toLowerCase().indexOf(nctrl.searchTerm)!=-1){
            found_items.push(menu_items[i])

          }

        }

          nctrl.foundItems=found_items
      }, function(error){});


    };



    nctrl.removeItem=function(index){

    var foundItemList=nctrl.foundItems;
    foundItemList.splice(index,1);
  };

};



  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){


    var service=this;

    service.getMenuItems=function(){

      var response=$http({

      method:"GET",
      url:("https://davids-restaurant.herokuapp.com/menu_items.json")
      });
      return response;



    };



    };





  function foundItemsDirective(){


    var ddo={

      templateUrl:'foundItems.html',
      restrict:'E',
      scope:{
        foundItems:'<',
        onRemove:'&'
      },
      controller:FoundItemsDirectiveController,
      controllerAs:'fdirctrl',
      bindToController:true

    };


    return ddo;

  }

  function FoundItemsDirectiveController(){






  }





})();
